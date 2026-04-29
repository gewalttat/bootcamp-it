// 1. Находим элементы на странице
const trainHtmlBtn = document.querySelector('#trainHtmlBtn');
const trainCssBtn = document.querySelector('#trainCssBtn');
const trainJsBtn = document.querySelector('#trainJsBtn');

const buyBtn = document.querySelector('#buyBtn');

const htmlProgress = document.querySelector('.html-fill');
const cssProgress = document.querySelector('.css-fill');
const jsProgress = document.querySelector('#jsProgress');

const levelDisplay = document.querySelector('#levelDisplay');
const classTitle = document.querySelector('#classTitle');
const playerCard = document.querySelector('#playerCard');
let coinsDisplay = document.querySelector('#coinsDisplay');


let jsXP = 0;
let level = 1;
let devRank = 0;
let cssExp = 0;
let htmlExp = 0;
let coins = 0;


// 3. Обновление интерфейса
function updateUI() {
    // здесь нужно обновить все полоски опыта, уровень, монетки и класс разработчика на странице
    jsProgress.style.width = jsXP + "%";
    cssProgress.style.width = cssExp + "%";
    htmlProgress.style.width = htmlExp + "%";
    coinsDisplay.textContent = coins + " 🪙";

    levelDisplay.textContent = "Lvl " + level;
}

// 4. Проверка класса разработчика - эту функцию не трогаем
function checkClass() {

    if (devRank < 1 && htmlExp >= 50 && cssExp >= 50) {
        devRank = 1
        classTitle.textContent = "Класс: Верстальщик"

    }
    if (devRank < 2 && htmlExp >= 70 && cssExp >= 70 && jsXP >= 50) {
        devRank = 2
        classTitle.textContent = "Класс: Junior Frontend"
    }

    if (devRank < 3 && htmlExp >= 90 && cssExp >= 90 && jsXP >= 80) {
        devRank = 3
        classTitle.textContent = "Класс: Middle Разработчик"
    }
    if (devRank < 4 && level >= 5) {
        devRank = 4
        classTitle.textContent = "Класс: Senior Разработчик"
    }
}

// 5. Покупка легендарки
function tryBuyLegendary() {
    // как только вы реализуете логику получения монет, покупка легендарки станет доступной
    if (typeof coins === "undefined") {
        alert("Ошибка: переменная coins не найдена");
        return;
    }

    if (coins >= 100) {
        coins = coins - 100;
        playerCard.classList.add("legendary");
        buyBtn.textContent = "Уже Легенда!";
        buyBtn.disabled = true;
        updateUI();
    } else {
        let need = 100 - coins;
        alert("Не хватает золота! Нужно еще " + need + " 🪙");
    }
}



// 6. Кнопка прокачки HTML
trainHtmlBtn.onclick = function() {

    // кодить тут по аналогии с trainJsBtn.onclick
    // например, для CSS можно создать переменную htmlXP и увеличивать ее на 20 при каждом клике
    // получение монет или увеличение уровня на ваше усмотрение
    htmlExp = htmlExp + 20;

    checkClass();
    updateUI();
};


// 7. Кнопка прокачки CSS
trainCssBtn.onclick = function() {

    // кодить тут по аналогии с trainJsBtn.onclick
    // например, для CSS можно создать переменную cssXP и увеличивать ее на 20 при каждом клике
    // получение монет или увеличение уровня на ваше усмотрение
    cssExp = cssExp + 20;

    checkClass();
    updateUI();

};


// 8. Кнопка прокачки JS
trainJsBtn.onclick = function() {
    // здесь нужно добавить логику получения монет, по аналогии с jsXP
    jsXP = jsXP + 20;
    coins = coins + 10;
    if (jsXP >= 100) {
        jsXP = 0;
        level = level + 1;
    }

    checkClass();
    updateUI();
};

// 9. Кнопка магазина
buyBtn.onclick = function() {
    tryBuyLegendary();
};