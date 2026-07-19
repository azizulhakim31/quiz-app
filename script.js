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
