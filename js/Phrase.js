/**
 * Phrase.js
 * 
 * Phrase Class
 */
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Appends letter to phrase section
     * for user guesses
     */
    addPhraseToDisplay() {
        const phraseList = document.querySelector('#phrase ul');

        for (let i = 0; i < this.phrase.length; i++) {
            const letterItem = document.createElement('li');
            const letter = this.phrase[i];
            let className;
            if (/\s/.test(letter)) {
                className = 'space';
            } else {
                className = 'hide letter ' + letter;
            }
            letterItem.innerHTML = letter;
            letterItem.className = className;
            phraseList.appendChild(letterItem);
        }
    }

    /**
     * Checks whether letter is matched
     * in phrase
     * @param {string} letter 
     */
    checkLetter(letter) {
        if (this.phrase.indexOf(letter) > -1) {
            return true;
        }

        return false;
    }

    /**
     * Shows matched letter if user guesses
     * correctly
     * @param {string} letter 
     */
    showMatchedLetter(letter) {
        if (this.checkLetter(letter)) {
            const phraseList = document.querySelector('#phrase ul');
            const letterElements = phraseList.querySelectorAll('.' + letter);

            letterElements.forEach(letterElement => {
                letterElement.classList.add('show');
                letterElement.classList.remove('hide');
            });
        }
    }
}