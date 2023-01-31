const inputs = document.querySelector(".inputs");
const hints = document.querySelector(".hint span");
const chancesLeft = document.querySelector(".chances span");
const wrongLetter = document.querySelector(".wrongLetter span");
const resetBtn = document.querySelector(".reset-btn");
const typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = 8;
    correctLetters = []; incorrectLetters = [];
    hints.innerText = ranItem.hint;
    chancesLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();
resetBtn.addEventListener("click", randomWord);

typingInput.addEventListener("input", (e) => {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z]+$/)) {
        if (incorrectLetters.includes(key) || correctLetters.includes(key)) {
            typingInput.value = "";
            return;
        }
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correctLetters.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(key);
        }
        chancesLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters.join(" ");
        typingInput.value = "";
    }
});
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

setInterval(() => {
    if (correctLetters.length === word.length) {
        alert(`Congrats! You found the word ${word.toUpperCase()}`);
        randomWord();
    } else if (maxGuesses < 1) {
        alert("Game over! Better luck next time");
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
        randomWord();
    }
}, 100);
