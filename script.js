const API_URL = "https://opentdb.com/api.php";

const setupScreen = document.getElementById("setup_screen");
const loadingScreen = document.getElementById("loading_screen");
const quizScreen = document.getElementById("quiz_screen");
const resultScreen = document.getElementById("result_screen");

const startBtn = document.getElementById("start_btn");
const nextBtn = document.getElementById("next_btn");
const restartBtn = document.getElementById("restart_btn");

const difficulty = document.getElementById("difficulty");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const questionText = document.getElementById("question");
const answerBox = document.getElementById("answers");
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
    showScreen(loadingScreen, true);

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

        if (!data.results?.length) {
            alert("No questions found. Try another option.");
            location.reload();
            return;
        }

        questions = data.results;
        score = 0;
        currentQuestion = 0;
        showScreen(loadingScreen, false);
        showScreen(quizScreen, true);
        totalDisplay.textContent = questions.length;
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

    createAnswers(current);
    nextBtn.classList.add("hidden");
    startTimer();
};

// create answer-btn dynamically
function createAnswers(question) {
    answerBox.innerHTML = "";

    const answers = [...question.incorrect_answers, question.correct_answer]
        .map((answer) => decodeHTML(answer))
        .sort(() => Math.random() - 0.5);

    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.className = "answer_btn";
        button.innerHTML = answer;
        button.onclick = () => checkAnswer(button, question.correct_answer);
        answerBox.appendChild(button);
    });
};

// check correct answer
function checkAnswer(button, correctAnswer) {
    clearInterval(timer);
    document.querySelectorAll(".answer_btn").forEach((btn) => btn.classList.add("disabled"));

    const chosenText = decodeHTML(button.textContent);
    const rightText = decodeHTML(correctAnswer);

    if (chosenText === rightText) {
        button.classList.add("correct");
        score += 1;
    } else {
        button.classList.add("wrong");
        showCorrectAnswer();
    }

    nextBtn.classList.remove("hidden");
};

// highlight correct answer
function showCorrectAnswer() {
    const correctAnswer = decodeHTML(questions[currentQuestion].correct_answer);

    document.querySelectorAll(".answer_btn").forEach((btn) => {
        if (decodeHTML(btn.textContent) === correctAnswer) {
            btn.classList.add("correct");
        }
    });
};

// disable all answer
function disableAnswers() {
    document.querySelectorAll(".answer_btn").forEach((btn) =>
        btn.classList.add("disabled"));
};

// display results
function displayResult() {
    clearInterval(timer);
    showScreen(quizScreen, false);
    showScreen(resultScreen, true);
    scoreDisplay.textContent = score;

    const percentage = Math.round((score / questions.length) * 100);
    message.textContent = percentage >= 80
        ? "Excellent! Amazing performance!"
        : percentage >= 50
            ? "Good job! Keep practicing."
            : "Keep learning and try again.";
};

startBtn.onclick = startQuiz;

nextBtn.onclick = () => {
    currentQuestion += 1;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        displayResult();
    }
};

restartBtn.onclick = () => location.reload();
