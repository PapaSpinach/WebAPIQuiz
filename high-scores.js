const highScoresElement = document.getElementById('high-scores');

const scoresString = localStorage.getItem('scores');

let scoresArray;

if (scoresString === null) {
    scoresArray = [];
} else {
    scoresArray = JSON.parse(scoresString);
}

function addScoreToPage(initials, score) {
    const listItem = document.createElement('li');
    listItem.innerText = initials + ' - ' + score;
    highScoresElement.appendChild(listItem);
}

const sortedScores = scoresArray.sort(function (a, b) {
    if (b.score > a.score) {
        return 1;
    } else if (a.score > b.score) {
        return -1;
    } else {
        return 0;
    }
});

for (var i = 0; i < sortedScores.length; i++) {
    const scoreObject = scoresArray[i];
    addScoreToPage(scoreObject.initials, scoreObject.score);
}

function goBack() {
    location.href = '/';
}

function clearHighScores() {
    localStorage.clear();
    highScoresElement.innerHTML = '';
}