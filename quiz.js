const questions = [
    {
        questionText: 'Commonly used data types DO Not Include:',
        answers: ['strings', 'booleans', 'alerts', 'numbers'],
        correctAnswer: 'alerts',
    },
    {
        questionText:
            'The condition in an if/else statement is enclosed with ______:',
        answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
        correctAnswer: 'parenthesis',
    },
    {
        questionText: 'Arrays in JavaScript can be used to store _____:',
        answers: [
            'numbers and strings',
            'other arrays',
            'booleans',
            'all of the above',
        ],
        correctAnswer: 'all of the above',
    },
    {
        questionText:
            'String values must be enclosed within _____ when being assigned to variables:',
        answers: ['commas', 'curly brackets', 'quotes', 'parentheses'],
        correctAnswer: 'quotes',
    },
    {
        questionText:
            'A very useful tool used during development and debugging for printing content to the debugger is _____:',
        answers: ['javascript', 'terminal/bash', 'for loops', 'console.log'],
        correctAnswer: 'console.log',
    },
];

const questionCount = questions.length;

const quizQuestionElement = document.getElementById('quiz-questions');
const answer1Element = document.getElementById('answer-1');
const answer2Element = document.getElementById('answer-2');
const answer3Element = document.getElementById('answer-3');
const answer4Element = document.getElementById('answer-4');
const judgementElement = document.getElementById('judgement');
const timeElement = document.getElementById('time');

function renderQuestion(question) {
    quizQuestionElement.innerText = question.questionText;
    answer1Element.innerText = '1. ' + question.answers[0];
    answer2Element.innerText = '2. ' + question.answers[1];
    answer3Element.innerText = '3. ' + question.answers[2];
    answer4Element.innerText = '4. ' + question.answers[3];
    judgementElement.innerText = '';
}

var currentQuestionNumber = 0;

function renderCurrentQuestion() {
    var currentQuestion = questions[currentQuestionNumber];
    renderQuestion(currentQuestion);
}

var score = 0;

renderCurrentQuestion();

var timeRemaining = 75;

timeElement.innerText = timeRemaining;

setInterval(function () {
    timeRemaining--;
    timeElement.innerText = timeRemaining;

    if (timeRemaining === 0) {
        endQuiz();
    }
}, 1000);

function onClickQuizAnswer(answerNumber) {
    var currentQuestion = questions[currentQuestionNumber];

    const userAnswer = currentQuestion.answers[answerNumber];

    if (userAnswer === currentQuestion.correctAnswer) {
        // user answered correctly
        score++;
        judgementElement.innerText = 'Correct!';
    } else {
        // user answered incorrectly
        judgementElement.innerText = 'Wrong!';

        timeRemaining = timeRemaining - 10;

        timeElement.innerText = timeRemaining;

        if (timeRemaining <= 0) {
            endQuiz();
        }
    }

    setTimeout(function () {
        nextQuestionOrEndQuiz();
    }, 3000);
}

function nextQuestionOrEndQuiz() {
    // check if currentQuestionNumber is the last question
    if (currentQuestionNumber === questionCount - 1) {
        endQuiz();
    } else {
        currentQuestionNumber++;

        renderCurrentQuestion();
    }
}

function endQuiz() {
    // Prompt user for initials
    const initials = prompt(
        'All done! Your final score is ' + score + '. What are your initials?'
    );
    // Save score along with initials in local storage
    saveScoreToLocalStorage(initials);
    // Navigate to high scores page
    location.href = 'high-scores.html';
}

function saveScoreToLocalStorage(initials) {
    const scoresString = localStorage.getItem('scores');

    let scoresArray;

    if (scoresString === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(scoresString);
    }

    scoresArray.push({
        initials: initials,
        score: score,
    });

    const newScoresString = JSON.stringify(scoresArray);

    localStorage.setItem('scores', newScoresString);
}