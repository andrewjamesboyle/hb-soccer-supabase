import { getGames, createGame } from './fetch-utils.js';
import { renderGame } from './render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');


const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

const currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0
};

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    currentGame.name1 = data.get('team-one');
    currentGame.name2 = data.get('team-two');

    nameForm.reset();
    displayCurrentGameEl();
});

teamOneAddButton.addEventListener('click', () => {
    currentGame.score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    currentGame.score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    if (currentGame.score1 > 0) {
        currentGame.score1--;
    }
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    if (currentGame.score2 > 0) {
        currentGame.score2--;
    }
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async () => {

    await createGame(currentGame);

    currentGame.name1 = '';
    currentGame.name2 = '';
    currentGame.score1 = 0;
    currentGame.score2 = 0;

    displayCurrentGameEl();
    await displayAllGames();
});

window.addEventListener('load', async () => {
    await displayAllGames();
});

function displayCurrentGameEl() {
    currentGameEl.textContent = '';
    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;
    const currentGameData = renderGame(currentGame);
    currentGameEl.append(currentGameData);
}

async function displayAllGames() {
    pastGamesEl.textContent = '';
    const allGames = await getGames();
    console.log(allGames);
    for (let game of allGames) {
        const pastGames = renderGame(game);
        pastGamesEl.append(pastGames);
    }
}

displayCurrentGameEl();
