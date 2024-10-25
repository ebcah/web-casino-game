let spells = [
    { name: "Cold Snap", combo: "QQQ", img: "invoker/cold snap.png", combo_numb:111 },
    { name: "Ghost Walk", combo: "QQW", img: "invoker/ghost walk.png" , combo_numb:112},
    { name: "Ice Wall", combo: "QQE", img: "invoker/ice wall.png", combo_numb:113 },
    { name: "EMP", combo: "WWW", img: "invoker/emp.png" , combo_numb:222},
    { name: "Tornado", combo: "WWQ", img: "invoker/tornado.png" , combo_numb:122},
    { name: "Alacrity", combo: "WWE", img: "invoker/alacrity.png", combo_numb:223 },
    { name: "Sun Strike", combo: "EEE", img: "invoker/sun strike.png" , combo_numb:333},
    { name: "Forge Spirit", combo: "EEQ", img: "invoker/forge spirit.png" , combo_numb:133},
    { name: "Chaos Meteor", combo: "EEW", img: "invoker/chaos meteor.png" , combo_numb:233},
    { name: "Deafening Blast", combo: "QWE", img: "invoker/deafening blast.png" , combo_numb:123}
];

let currentSpellIndex = 0;
let currentSpell = {};
let playerInput = "";
let spellProgress = 0;
let startTime;
let isBlocked = false;
let blockTimeout;
let gameTimer;
const timeLimit = 15;

const spellComboEl = document.getElementById('spell-combo');
const spellImageEl = document.getElementById('spell-image');
const inputStatusEl = document.getElementById('input-status');
const bonusMessageEl = document.getElementById('bonus-message');
const currentSpellNumberEl = document.getElementById('current-spell-number');

let keyBindings = {
    quas: 'Q',
    wex: 'W',
    exort: 'E',
    invoke: 'R'
};

let isRebinding = {
    quas: false,
    wex: false,
    exort: false,
    invoke: false
};

function contains(arr, elem) {
    return arr.includes(elem);
}

document.querySelector('button.quas').addEventListener('click', () => startRebinding('quas'));
document.querySelector('button.wex').addEventListener('click', () => startRebinding('wex'));
document.querySelector('button.exort').addEventListener('click', () => startRebinding('exort'));
document.querySelector('button.invoke').addEventListener('click', () => startRebinding('invoke'));

function startRebinding(element) {
    isRebinding[element] = true;
    inputStatusEl.textContent = `Нажмите клавишу для переназначения ${element}`;
}

document.addEventListener('keydown', (event) => {
    const key = event.key.toUpperCase();

    if (isRebinding.quas) {
        if (Object.values(keyBindings).includes(key)) {
            inputStatusEl.textContent = `${key} уже занят другой командой`;
        } else {
            keyBindings.quas = key;
            isRebinding.quas = false;
            document.querySelector('#quas_text').innerHTML = `${key} - Quas`;
            inputStatusEl.textContent = `Клавиша Quas изменена на ${key}`;
            updateSpellCombos();
        }
    } else if (isRebinding.wex) {
        if (Object.values(keyBindings).includes(key)) {
            inputStatusEl.textContent = `${key} уже занят другой командой`;
        } else {
            keyBindings.wex = key;
            isRebinding.wex = false;
            document.querySelector('#wex_text').innerHTML = `${key} - Wex`;
            inputStatusEl.textContent = `Клавиша Wex изменена на ${key}`;
            updateSpellCombos();
        }
    } else if (isRebinding.exort) {
        if (Object.values(keyBindings).includes(key)) {
            inputStatusEl.textContent = `${key} уже занят другой командой`;
        } else {
            keyBindings.exort = key;
            isRebinding.exort = false;
            document.querySelector('#exort_text').innerHTML = `${key} - Exort`;
            inputStatusEl.textContent = `Клавиша Exort изменена на ${key}`;
            updateSpellCombos();
        }
    } else if (isRebinding.invoke) {
        if (Object.values(keyBindings).includes(key)) {
            inputStatusEl.textContent = `${key} уже занят другой командой`;
        } else {
            keyBindings.invoke = key;
            isRebinding.invoke = false;
            document.querySelector('#invoke_text').innerHTML = `${key} - Invoke`;
            inputStatusEl.textContent = `Клавиша Invoke изменена на ${key}`;
            updateSpellCombos();
        }
    }
});

document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    if (isBlocked) {
        alert("Игра заблокирована на час. Попробуйте позже.");
        return;
    }

    spellProgress = 0;
    currentSpellIndex = 0;
    playerInput = "";
    currentSpellNumberEl.textContent = "1";

    startTime = Date.now();
    loadNextSpell();

    document.addEventListener('keydown', handleKeyPress);
    
    startTimer();
}

function startTimer() {
    let timeLeft = timeLimit;
    updateTimerDisplay(timeLeft);

    gameTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(gameTimer);
            alert("Время истекло! Вы проиграли.");
            resetGame();
        }
    }, 1000);
}

function updateTimerDisplay(timeLeft) {
    const timerEl = document.getElementById('timer');
    timerEl.textContent = `Осталось времени: ${timeLeft} секунд`;
}

function loadNextSpell() {
    currentSpell = getRandomSpell();
    spellImageEl.innerHTML = `<img src="${currentSpell.img}" alt="${currentSpell.name}">`;
    playerInput = "";
    inputStatusEl.textContent = `Type: ${playerInput}`;
}

function updatePlayerInputDisplay() {
    const spellBar = document.getElementById('spell-bar');
    spellBar.innerHTML = '';

    for (let char of playerInput) {
        let imgSrc = '';
        if (char === keyBindings.quas) {
            imgSrc = 'invoker/quas.png';
        } else if (char === keyBindings.wex) {
            imgSrc = 'invoker/wex.png';
        } else if (char === keyBindings.exort) {
            imgSrc = 'invoker/exort.png';
        }

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = char;
        spellBar.appendChild(img);
    }
}

let leng = 0;

function handleKeyPress(event) {
    if (isBlocked) return;

    const key = event.key.toUpperCase();

    if (key === keyBindings.quas || key === keyBindings.wex || key === keyBindings.exort) {
        if (playerInput.length >= 3) {
            let inputArray = playerInput.split('');
            inputArray[leng] = key;
            playerInput = inputArray.join('');
            leng = (leng + 1) % 3;
        } else {
            playerInput += key;
        }

        updatePlayerInputDisplay();
        inputStatusEl.textContent = `You pressed: ${playerInput}`;
    }

    if (key === keyBindings.invoke && playerInput.length === 3) {
        if (isComboValid(playerInput, currentSpell.combo)) {
            spellProgress++;
            if (spellProgress >= 6) {
                checkWinCondition();
            } else {
                playerInput = "";
                leng = 0;
                currentSpellNumberEl.textContent = spellProgress + 1;
                loadNextSpell();
            }
        } else {
            blockGame();
        }
    }
}

function isComboValid(input, combo) {
    if (input.length !== combo.length) return false;

    for (let char of input) {
        if (!combo.includes(char)) return false;
    }

    return true;
}

function getRandomSpell() {
    return spells[Math.floor(Math.random() * spells.length)];
}

function checkWinCondition() {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    alert(`Вы победили! Время: ${timeTaken.toFixed(2)} секунд`);
    resetGame();
}

function blockGame() {
    isBlocked = true;
    inputStatusEl.textContent = "Некорректная комбинация! Игра заблокирована на час.";
    clearInterval(gameTimer);
    blockTimeout = setTimeout(() => {
        isBlocked = false;
        inputStatusEl.textContent = "Попробуйте снова!";
    }, 3600000);
}

function resetGame() {
    clearTimeout(blockTimeout);
    clearInterval(gameTimer); 
    isBlocked = false;
    inputStatusEl.textContent = "Вы получили бонус к пополнению на 30%";
    const timerEl = document.getElementById('timer');
    timerEl.textContent = ""; 
}

updateSpellCombos();
