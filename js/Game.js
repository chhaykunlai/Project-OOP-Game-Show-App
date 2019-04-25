/**
 * Game.js
 * 
 * Game Class
 */
class Game {
    constructor(missed, phrases, activePhrase) {
        this.missed = missed || 0;
        this.phrases = [
            new Phrase('I love you'),
            new Phrase('Butterfly'),
            new Phrase('Air Conditioner'),
            new Phrase('Internet'),
            new Phrase('Coffee')
        ];
        this.activePhrase = activePhrase || null;
    }

    /**
     * Starts game by hide the overlay section
     * with start button, start quote randomly,
     * and display phrase on screen with blank boxes
     */
    startGame() {
        const overlaySection = document.getElementById('overlay');

        overlaySection.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Gets random phrase by amount of phrases
     * 
     * @returns {object}
     */
    getRandomPhrase() {
        const randomNumber = Math.floor(Math.random() * this.phrases.length);

        return this.phrases[randomNumber];
    }

    /**
     * Handles interaction when users select letter
     * on onscreen keys or press their own keyboard
     * @param {object} keyButton 
     */
    handleInteraction(keyButton) {
        keyButton.setAttribute('disabled', true);
        if (this.activePhrase.checkLetter(keyButton.innerHTML)) {
            keyButton.classList.add('chosen');
            this.activePhrase.showMatchedLetter(keyButton.innerHTML);
            this.checkForWin();
        } else {
            keyButton.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * Removes life from scoreboard by
     * changing image and increase missed
     * property by 1 when it up to 5 then
     * game over
     */
    removeLife() {
        const scoreBoardSection = document.getElementById('scoreboard');
        const lifePoints = scoreBoardSection.querySelectorAll('.tries img');
        const hearts = document.getElementById('hearts');

        for (let i = lifePoints.length - 1; i >= 0; i--) {
            if (lifePoints[i].getAttribute('src') === 'images/liveHeart.png') {
                lifePoints[i].setAttribute('src', 'images/lostHeart.png');

                break;
            }
        }
        this.missed += 1;
        hearts.innerHTML = 5 - this.missed;

        if (this.missed === 5) {
            this.gameOver(false);
        }
    }

    /**
     * Checks all letters whether they all reveals
     * if so, game over and user will win the game
     */
    checkForWin() {
        const phraseList = document.querySelector('#phrase ul');
        const letterElements = phraseList.querySelectorAll('.letter.show');
        const phrase = this.activePhrase.phrase.replace(/\s/g, '');

        if (phrase.length === letterElements.length) {
            this.gameOver(true);
        }
    }

    /**
     * Set game over with win or loss message
     * depending on isWin parameter passes
     * @param {boolean} isWin 
     */
    gameOver(isWin) {
        const overlaySection = document.getElementById('overlay');
        const gameOverMessage = overlaySection.querySelector('#game-over-message');

        overlaySection.style.display = '';
        if (isWin) {
            overlaySection.className = 'win';
            gameOverMessage.innerHTML = 'You win!';
        } else {
            overlaySection.className = 'lose';
            gameOverMessage.innerHTML = 'You lose!';
        }
    }

    /**
     * Resets game before the game restarts
     */
    reset() {
        const overlaySection = document.getElementById('overlay');
        const phraseList = document.querySelector('#phrase ul');
        const phraseItems = phraseList.querySelectorAll('li');
        const keyButtons = document.querySelectorAll('.key');
        const scoreBoardSection = document.getElementById('scoreboard');
        const lifePoints = scoreBoardSection.querySelectorAll('.tries img');
        const hearts = document.getElementById('hearts');

        overlaySection.className = 'start';

        // Removes letter items from hidden word
        phraseItems.forEach(phraseItem => {
            phraseList.removeChild(phraseItem);
        });

        // Enables all onscreen keys and makes it normally
        keyButtons.forEach(keyButton => {
            keyButton.removeAttribute('disabled');
            keyButton.className = 'key';
        });

        // Resets life points
        lifePoints.forEach(lifePoint => {
            lifePoint.setAttribute('src', 'images/liveHeart.png');
        });

        // Resets life count
        hearts.innerHTML = 5
    }
}