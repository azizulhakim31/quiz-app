const API_URL = "https://opentdb.com/api.php";

const setupScreen = document.getElementById("setup_screen");
const quizScreen = document.getElementById("quiz_screen");
const resultScreen = document.getElementById("result_screen");

const startBtn = document.getElementById("start_btn");
const nextBtn = document.getElementById("next_btn");
const restartBtn = document.getElementById("restart_btn");

const difficulty = document.getElementById("difficulty");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const questionText = document.getElementById("question");
const answerBox = document.getElementById("answer");
const questionCounter = document.getElementById("question_counter");
const progressBar = document.getElementById("progress_bar");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const message = document.getElementById("message");


let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

// decode HTML entities in text
function decodeHTML(text) {
    const temp = document.createElement("textarea");
    temp.innerHTML = text || "";
    return temp.value;
};

// show or hide screen
function showScreen(screen, visible) {
    screen.classList.toggle("hidden", !visible);
};

// reset countdown timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = `⏱ ${timeLeft}`;
};

// start countdown timer
function startTimer() {
    resetTimer();

    timer = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.textContent = `⏱ ${timeLeft}`;


        if (timeLeft <= 0) {
            clearInterval(timer);
            disableAnswers();
            showCorrectAnswer();
            nextBtn.classList.remove("hidden");
        }
    }, 1000);
};

// fetch & start quiz
async function startQuiz() {
    showScreen(setupScreen, false);

    const params = new URLSearchParams({
        amount: amount.value,
        difficulty: difficulty.value,
        type: "multiple"
    });

    if (category.value) {
        params.append("category", category.value);
    }

    try {
        const response = await fetch(`${API_URL}?${params}`);
        const data = await response.json();

        if (!data.result?.length) {
            alert("No questions found. Try another option");
            location.reload();
            return;
        }

        question = data.results;
        score = 0;
        currentQuestion = 0;
        showScreen(quizScreen, true);
        totalDisplay.textContent = question.length;
        showQuestion();
    } catch (error) {
        alert("Failed to load quiz.")
        location.reload();
    }
};

// display question
function showQuestion() {
    const current = questions[currentQuestion];

    questionCounter.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    questionText.innerHTML = decodeHTML(current.question);
}
