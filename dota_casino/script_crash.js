let balance = 100;
let currentMultiplier = 1.00;
let crashPoint = 0;
let isCrashed = false;
let bettingActive = false;
let countdownTimer;
let increaseInterval;
let autoCashoutTimer;
let countdownValue = 10;
let autoCashoutMultiplier = 2.0;

const balanceElement = document.getElementById("balance");
const currentMultiplierElement = document.getElementById("current-multiplier");
const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");
const betButton = document.getElementById("bet-button");
const cashoutButton = document.getElementById("cashout-button");
const betAmountInput = document.getElementById("bet-amount");
const autoCashoutInput = document.getElementById("auto-cashout");
const runner = document.getElementById("runner");
const gameLogElement = document.getElementById("game-log");
const lineElement = document.getElementById("line");

function startGame() {
    currentMultiplier = 1.00;
    isCrashed = false;
    crashPoint = Math.random() * (2.5 - 1.5) + 1.5;
    runner.style.transform = "translate(0, 0)";
    lineElement.style.transform = "rotate(0deg)";
    lineElement.style.width = "0%";
    updateMultiplier();

    let baseSpeed = 180;
    let increment = 0.01;

    increaseInterval = setInterval(() => {
        if (!isCrashed) {
            currentMultiplier += increment;
            updateMultiplier();

            const runnerPositionX = Math.min(100, currentMultiplier * 30);
            const runnerPositionY = Math.min(50, currentMultiplier * 5);
            runner.style.transform = `translate(${runnerPositionX}px, ${runnerPositionY}px)`;

            const lineWidth = Math.min(100, (currentMultiplier - 1) * 100);
            lineElement.style.width = `${lineWidth}%`;

            if (currentMultiplier >= 1.5) {
                const lineRotation = Math.min(30, (currentMultiplier - 1.5) * (45 / (2.5 - 1.5))) * -1;
                lineElement.style.transform = `rotate(${lineRotation}deg)`;
            }

            if (currentMultiplier >= crashPoint) {
                handleCrash();
            }
        }
    }, baseSpeed);
}

function handleCrash() {
    isCrashed = true;
    messageElement.textContent = `Crashed at: ${crashPoint.toFixed(2)}x`;
    cashoutButton.disabled = true;
    clearInterval(increaseInterval);
    clearTimeout(autoCashoutTimer);
    bettingActive = false;

    gameLogElement.innerHTML += `Crashed at ${crashPoint.toFixed(2)}x<br>`;
    setTimeout(() => {
        resetGame();
        autoStartGame();
    }, 3000);
}

function resetGame() {
    countdownValue = 10;
    currentMultiplier = 1.00;
    updateMultiplier();

    betButton.disabled = false;
    betButton.textContent = "Place Bet";
    messageElement.textContent = "You can place a new bet!";
    cashoutButton.disabled = true;

    gameLogElement.innerHTML += `New game started. Current balance: $${balance.toFixed(2)}<br>`;
}

function updateMultiplier() {
    currentMultiplierElement.textContent = currentMultiplier.toFixed(2) + 'x';
}

function autoStartGame() {
    if (bettingActive) return;
    messageElement.textContent = `Game starting in ${countdownValue} seconds...`;
    countdownElement.textContent = `Осталось ${countdownValue} секунд`;

    countdownTimer = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = `Осталось ${countdownValue} секунд`;

        if (countdownValue > 0) {
            messageElement.textContent = `Waiting... Time remaining: ${countdownValue} seconds.`;
        }

        if (countdownValue <= 0) {
            messageElement.textContent = "Game started!";
            clearInterval(countdownTimer);
            startGame();
            betButton.disabled = true;
            autoCashoutCheck();
        }
    }, 1000);
}

function autoCashoutCheck() {
    autoCashoutTimer = setInterval(() => {
        if (currentMultiplier >= autoCashoutMultiplier && bettingActive) {
            cashout();
            clearInterval(autoCashoutTimer);
        }
    }, 50);
}

function cashout() {
    if (!isCrashed && bettingActive) {
        const betAmount = parseFloat(betAmountInput.value);
        const winnings = betAmount * currentMultiplier;
        balance += winnings;
        balanceElement.textContent = `$${balance.toFixed(2)}`;
        messageElement.textContent = `You cashed out at ${currentMultiplier.toFixed(2)}x! Winnings: $${winnings.toFixed(2)}`;
        cashoutButton.disabled = true;
        clearTimeout(autoCashoutTimer);
        bettingActive = false;
    }
}

betButton.addEventListener("click", () => {
    const betAmount = parseFloat(betAmountInput.value);
    if (!bettingActive) {
        if (betAmount > 0 && betAmount <= balance) {
            balance -= betAmount;
            balanceElement.textContent = `$${balance.toFixed(2)}`;
            bettingActive = true;
            cashoutButton.disabled = false;
            messageElement.textContent = `You placed a bet of $${betAmount.toFixed(2)}.`;
            if (!countdownTimer) {
                autoStartGame();
            }
            betButton.textContent = "Exit Game";
            betButton.classList.add("active");
        } else {
            messageElement.textContent = "Invalid bet amount.";
        }
    } else {
        clearInterval(countdownTimer);
        countdownTimer = null;
        messageElement.textContent = "You exited the countdown.";
        betButton.textContent = "Place Bet";
        bettingActive = false;
        cashoutButton.disabled = true;
        clearTimeout(autoCashoutTimer);
        currentMultiplier = 1.00;
        updateMultiplier();
        balanceElement.textContent = `$${balance.toFixed(2)}`;
        countdownValue = 10;
        betButton.classList.remove("active");
    }
});

cashoutButton.addEventListener("click", cashout);

autoCashoutInput.addEventListener("input", () => {
    const newMultiplier = parseFloat(autoCashoutInput.value);
    if (!isNaN(newMultiplier) && newMultiplier > 0) {
        autoCashoutMultiplier = newMultiplier;
        messageElement.textContent = `Auto cashout multiplier set to ${autoCashoutMultiplier.toFixed(2)}x.`;
    }
});

autoStartGame();
