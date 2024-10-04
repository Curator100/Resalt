const questions = [
    { 
        question: "How many hours do you study weekly?", 
        scale: "0-2 hours = 0, 2-4 hours = 1, 4-6 hours = 2, 6-8 hours = 3, 8-10 hours = 4, 10-12 hours = 5, 12-14 hours = 6, 14-16 hours = 7, 16-18 hours = 8, 18-19 hours = 9, 19+ hours = 10" 
    },
    { 
        question: "How many subjects do you make detailed notes for?", 
        scale: "0 subjects = 0, 1 subject = 1, 2 subjects = 2, 3 subjects = 3, 4 subjects = 4, 5 subjects = 5, 6 subjects = 6, 7 subjects = 7, 8 subjects = 8, 9 subjects = 9, 10+ subjects = 10" 
    },
    { 
        question: "How many hours do you spend revising weekly?", 
        scale: "0-1 hours = 0, 1-2 hours = 1, 2-3 hours = 2, 3-4 hours = 3, 4-5 hours = 4, 5-6 hours = 5, 6-7 hours = 6, 7-8 hours = 7, 8-9 hours = 8, 9-10 hours = 9, 10+ hours = 10" 
    },
    { 
        question: "How many mock tests do you take per month?", 
        scale: "0 tests = 0, 1 test = 1, 2 tests = 2, 3 tests = 3, 4 tests = 4, 5 tests = 5, 6 tests = 6, 7 tests = 7, 8 tests = 8, 9 tests = 9, 10+ tests = 10" 
    },
    { 
        question: "How many hours do you dedicate to self-study weekly?", 
        scale: "0-2 hours = 0, 2-4 hours = 1, 4-6 hours = 2, 6-8 hours = 3, 8-10 hours = 4, 10-12 hours = 5, 12-14 hours = 6, 14-16 hours = 7, 16-18 hours = 8, 18-19 hours = 9, 19+ hours = 10" 
    },
    { 
        question: "How much time do you spend reading non-academic books weekly?", 
        scale: "0-1 hours = 0, 1-2 hours = 1, 2-3 hours = 2, 3-4 hours = 3, 4-5 hours = 4, 5-6 hours = 5, 6-7 hours = 6, 7-8 hours = 7, 8-9 hours = 8, 9-10 hours = 9, 10+ hours = 10" 
    },
    { 
        question: "How often do you revise your notes?", 
        scale: "Never = 0, Once a month = 1, Twice a month = 2, Once a week = 3, Twice a week = 4, Thrice a week = 5, Four times a week = 6, Five times a week = 7, Six times a week = 8, Daily = 9, More than once daily = 10" 
    },
    { 
        question: "How many study groups are you part of?", 
        scale: "0 groups = 0, 1 group = 1, 2 groups = 2, 3 groups = 3, 4 groups = 4, 5 groups = 5, 6 groups = 6, 7 groups = 7, 8 groups = 8, 9 groups = 9, 10+ groups = 10" 
    },
    { 
        question: "How many projects/assignments do you complete monthly?", 
        scale: "0 projects = 0, 1 project = 1, 2 projects = 2, 3 projects = 3, 4 projects = 4, 5 projects = 5, 6 projects = 6, 7 projects = 7, 8 projects = 8, 9 projects = 9, 10+ projects = 10" 
    },
    { 
        question: "How often do you seek additional help for tough topics?", 
        scale: "Never = 0, Once a month = 1, Twice a month = 2, Once a week = 3, Twice a week = 4, Thrice a week = 5, Four times a week = 6, Five times a week = 7, Six times a week = 8, Daily = 9, More than once daily = 10" 
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-btn");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
    nextButton.style.display = 'none';
    scoreContainer.style.display = 'none';
    questionContainer.style.display = 'block';
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}\n(${currentQuestion.scale})`;
    for (let i = 0; i <= 10; i++) {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = i;
        button.addEventListener("click", () => selectAnswer(i));
        answerButtons.appendChild(button);
    }
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(selectedAnswer) {
    score += selectedAnswer;
    nextButton.style.display = 'block';
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    questionContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    const percentageScore = Math.round((score / (questions.length * 10)) * 100);
    resultText.innerText = `You scored: ${percentageScore}%\n${getFeedback(percentageScore)}`;
}

function getFeedback(score) {
    if (score > 80) return "You're a star student!";
    else if (score > 50) return "You're doing great, keep pushing!";
    else return "Let's work on building better study habits!";
}

restartButton.addEventListener("click", startQuiz);

// Start quiz on page load
startQuiz();
