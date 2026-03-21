// 1. Находим нужные элементы на странице
const btn = document.querySelector('#trainBtn');
const jsProgress = document.querySelector('#jsProgress');
const levelDisplay = document.querySelector('#levelDisplay');

// если будет время
const achievements = document.querySelector('#achievements');

// 2. Создаем переменные для хранения текущего прогресса
let currentXp = 1;   // Текущий процент ширины полоски JS
let currentLevel = 1; // Текущий уровень персонажа

// 3. Вешаем слушатель клика на кнопку
btn.onclick = function() {
    // Увеличиваем опыт на 10
    let randomXp = Math.floor(Math.random() * 20) + 1;
    currentXp = currentXp + randomXp;

    // Если опыт достигает 100, мы повышаем уровень!
    if (currentXp >= 100) {
        currentLevel = currentLevel + 1; // Увеличиваем уровень
        currentXp = 10; // Сбрасываем опыт (полоску) назад

        // если будет время
        achievements.innerHTML = "";
        for (let i = 0; i < currentLevel; i++) {
            const star = document.createElement("span");
            star.textContent = "⭐";
            achievements.appendChild(star);
        }
        
        // Показываем уведомление о левелапе
        alert("Поздравляем! Уровень повышен до " + currentLevel + "!");
    }

    // --- МАГИЯ: ОБНОВЛЯЕМ ЭКРАН ---
    
    // Меняем ширину красной полоски (добавляем значок %)
    jsProgress.style.width = currentXp + "%";
    
    // Обновляем текст в бейджике
    levelDisplay.textContent = "Lvl " + currentLevel;
};

// если будет время
for (let i = 0; i < currentLevel; i++) {
    achievements.innerHTML = achievements.innerHTML + "⭐";
}