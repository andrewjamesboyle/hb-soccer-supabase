import { getGames, createGame } from './fetch-utils.js';
import { renderGame } from './render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
// const logoutButton = document.getElementById('logout');

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
    // don't forget to prevent the default form behavior!
    e.preventDefault();
    // get the name data from the form
    const data = new FormData(nameForm);
    // set the state to this data from the form
    currentGame.name1 = data.get('team-one');
    currentGame.name2 = data.get('team-two');
    // reset the form values
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
    // create a new game using the current game state
    // pastGamesEl.textContent = ''; 

    await createGame(currentGame);
    // after creating this new game, re-fetch the games to get the updated state and display them (hint: call displayAllGames())

    currentGame.name1 = '';
    currentGame.name2 = '';
    currentGame.score1 = 0;
    currentGame.score2 = 0;

    displayCurrentGameEl();
    await displayAllGames();
});

// on load . . .
window.addEventListener('load', async () => {
    // display all past games (hint: call displayAllGames())
    await displayAllGames();
});

function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';

    teamOneLabel.textContent = currentGame.name1;
    teamTwoLabel.textContent = currentGame.name2;

    const currentGameData = renderGame(currentGame);
    
    currentGameEl.append(currentGameData);
}

async function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    // FETCH ALL GAMES from supabase

    const allGames = await getGames();
    console.log(allGames);
    for (let game of allGames) {
        const pastGames = renderGame(game);
        pastGamesEl.append(pastGames);
    }
    // loop through the past games
    // render and append a past game for each past game in state
    // 
}

displayCurrentGameEl();
