const they_can_drop = [
    { name: "Legendary Item", img: "icon.png", price: 100 },
    { name: "Epic Item 1", img: "icon.png", price: 40 },
    { name: "Epic Item 2", img: "icon.png", price: 40 },
    { name: "Epic Item 3", img: "icon.png", price: 40 },
    { name: "Epic Item 4", img: "icon.png", price: 40 },
    { name: "Rare Item 1", img: "icon.png", price: 20 },
    { name: "Rare Item 2", img: "icon.png", price: 20 },
    { name: "Rare Item 3", img: "icon.png", price: 20 },
    { name: "Rare Item 4", img: "icon.png", price: 20 },
    { name: "Rare Item 5", img: "icon.png", price: 20 },
    { name: "Rare Item 6", img: "icon.png", price: 20 },
    { name: "Rare Item 7", img: "icon.png", price: 20 },
    { name: "Rare Item 8", img: "icon.png", price: 20 },
    { name: "Rare Item 9", img: "icon.png", price: 20 },
    { name: "Rare Item 10", img: "icon.png", price: 20 },
    { name: "Common Item 1", img: "icon.png", price: 10 },
    { name: "Common Item 2", img: "icon.png", price: 10 },
    { name: "Common Item 3", img: "icon.png", price: 10 },
    { name: "Common Item 4", img: "icon.png", price: 10 },
    { name: "Common Item 5", img: "icon.png", price: 10 },
    { name: "Common Item 6", img: "icon.png", price: 10 },
    { name: "Common Item 7", img: "icon.png", price: 10 },
    { name: "Common Item 8", img: "icon.png", price: 10 },
    { name: "Common Item 9", img: "icon.png", price: 10 },
    { name: "Common Item 10", img: "icon.png", price: 10 },
    { name: "Worse Item 1", img: "icon.png", price: 5 },
    { name: "Worse Item 2", img: "icon.png", price: 5 },
    { name: "Worse Item 3", img: "icon.png", price: 5 },
    { name: "Worse Item 4", img: "icon.png", price: 5 },
    { name: "Worse Item 5", img: "icon.png", price: 5 },
    { name: "Worse Item 6", img: "icon.png", price: 5 },
    { name: "Worse Item 7", img: "icon.png", price: 5 },
    { name: "Worse Item 8", img: "icon.png", price: 5 },
    { name: "Worse Item 9", img: "icon.png", price: 5 },
    { name: "Worse Item 10", img: "icon.png", price: 5 },
];

let winners_panel = [];
const itemRoller = document.getElementById("itemRoller");
const openCaseBtn = document.getElementById("openCaseBtn");
const rewardSection = document.getElementById("rewardSection");
const rewardImage = document.getElementById("rewardImage");
const rewardName = document.getElementById("rewardName");
const rewardPrice = document.getElementById("rewardPrice");
const itemsContainer = document.querySelector('.items-container');

let isAnimating = false; // Новый флаг для отслеживания состояния анимации

// Функция для получения случайного предмета
function getRandomItem() {
    const randomNum = Math.random();

    if (randomNum < 0.02) {
        return they_can_drop[0]; // Legendary Item
    } else if (randomNum < 0.22) {
        return they_can_drop[Math.floor(Math.random() * 4) + 1]; // Epic Items
    } else if (randomNum < 0.72) {
        return they_can_drop[Math.floor(Math.random() * 10) + 6]; // Rare Items
    } else if (randomNum < 1.00) {
        return they_can_drop[Math.floor(Math.random() * 10) + 16]; // Common Items
    } else {
        return they_can_drop[Math.floor(Math.random() * 10) + 26]; // Worse Items
    }
}

// Функция для открытия кейса
function openCase() {
    if (isAnimating) return; // Игнорировать нажатие, если анимация выполняется

    isAnimating = true; // Установить флаг анимации
    openCaseBtn.disabled = true;
    rewardSection.style.display = "none"; // Скрыть изначально
    itemRoller.style.transform = "translateX(0)";
    
    // Очистка itemRoller для удаления предыдущих предметов
    itemRoller.innerHTML = '';

    let items = []; // Массив для хранения предметов для этого розыгрыша
    for (let i = 0; i < 50; i++) {
        items.push(getRandomItem());
    }

    // Добавление изображений предметов в интерфейс
    items.forEach(item => {
        const img = document.createElement("img");
        img.src = item.img;
        img.alt = item.name;
        itemRoller.appendChild(img);
    });

    let offset = 0;
    const maxOffset = (items.length - 3) * 100 - 300 + getRandomNumber(-48, 48);
    const totalDuration = 6000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        const easing = easeOutExpo(progress);

        offset = maxOffset * easing;
        itemRoller.style.transform = `translateX(-${offset}px)`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            const finalItem = items[items.length - 5]; // Получить последний сгенерированный предмет
            rewardImage.src = finalItem.img;
            rewardName.innerText = finalItem.name;
            rewardPrice.innerText = `$${finalItem.price}`;

            console.log("Final item:", finalItem); // Лог для отладки
            rewardSection.style.display = "block"; // Показать после установки награды

            // Добавление предмета в winners_panel
            winners_panel.push(finalItem);
            displayWinnersPanel();

            openCaseBtn.disabled = false; // Включить кнопку снова
            isAnimating = false; // Сбросить состояние анимации
        }
    }

    requestAnimationFrame(animate);
}

// Функция для отображения выигранных предметов в panel-bar
function displayWinnersPanel() {
    const panels = document.querySelectorAll('.panel-item');
    
    // Очищаем текущие изображения
    panels.forEach(panel => {
        panel.innerHTML = '';
    });

    // Добавляем новые изображения в порядке от конца к началу
    winners_panel.slice(-panels.length).forEach((item, index) => {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.name;
        panels[panels.length - 1 - index].appendChild(img); // Добавляем в обратном порядке
    });
}

// Функция для easing анимации
function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -30 * t);
}

// Функция для генерации случайного числа
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Обработчик события для кнопки открытия кейса
openCaseBtn.addEventListener("click", openCase);

// Функция для отображения всех предметов
function displayAllItems() {
    they_can_drop.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        itemCard.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Цена: $${item.price}</p>
            <p>Редкость: ${getRarity(item)}</p>
        `;

        itemsContainer.appendChild(itemCard);
    });
}

// Функция для получения редкости предмета
function getRarity(item) {
    if (item.price >= 100) {
        return 'Легендарный';
    } else if (item.price >= 40) {
        return 'Эпический';
    } else if (item.price >= 20) {
        return 'Редкий';
    } else if (item.price >= 10) {
        return 'Обычный';
    } else {
        return 'Худший';
    }
}

// Вызов функции после инициализации
displayAllItems();
