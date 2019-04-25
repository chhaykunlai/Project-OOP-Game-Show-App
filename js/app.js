/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const startGameButton = document.getElementById('btn__reset');
const keyButtons = document.querySelectorAll('.key');
let game;

/**
 * Adds event listener for start game button
 * it will initize new instance of game
 * and reset game if user already played before
 * game start
 */
startGameButton.addEventListener('click', e => {
    game = new Game();
    game.reset();
    game.startGame();
});

/**
 * Loops for onscreen keys to handle event click
 */
keyButtons.forEach(keyButton => {
    keyButton.addEventListener('click', e => {
        game.handleInteraction(e.target);
    });
});

/**
 * Registers event for users when
 * they use their own keyboard instead of
 * onscreen keys, so it will trigger
 * onscreen keys which has the same as
 * the key they press on their keyboard
 */
document.addEventListener('keypress', e => {
    if (!game) {
        return;
    }

    keyButtons.forEach(keyButton => {
        if (keyButton.innerHTML === e.key) {
            keyButton.click();
        }
    });
});