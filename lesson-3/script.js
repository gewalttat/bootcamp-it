// Получаем элемент с id 'display' из HTML страницы, где будем показывать сообщения
const display = document.getElementById('display');
// Получаем элемент с id 'controls' из HTML страницы, где будем добавлять кнопки
const controls = document.getElementById('controls');

// Это секретный хэш, который представляет собой зашифрованный пароль "instapass"
const secretHash = "aW5zdGFwYXNz";

// Функция для записи сообщений в лог (журнал действий)
function log(text, type = '') {
    // Создаем новый элемент параграфа для сообщения
    const p = document.createElement('p');
    // Добавляем классы для стиля сообщения
    p.className = `log-entry ${type}`;
    // Устанавливаем текст сообщения с символом >
    p.textContent = `> ${text}`;
    // Добавляем параграф в область отображения
    display.appendChild(p);
    // Прокручиваем область вниз, чтобы видеть последние сообщения
    display.scrollTop = display.scrollHeight;
}

// Назначаем действие на кнопку с id 'step-1'
document.getElementById('step-1').onclick = function() {
    // Создаем объект с информацией о цели (человеке, чей аккаунт взламываем)
    const targetPerson = {
        name: "Иван Иванов", // Имя человека
        platform: "Instagram", // Социальная сеть
        stats: { followers: 450, posts: 12 }, // Статистика: подписчики и посты
        interests: ["football", "gaming", "pizza"], // Интересы
        isPrivate: true // Профиль закрытый
    };

    // Записываем в лог, что объект идентифицирован
    log(`ОБЪЕКТ ИДЕНТИФИЦИРОВАН: ${targetPerson.name.toUpperCase()}`);
    // Записываем социальную сеть
    log(`СОЦИАЛЬНАЯ СЕТЬ: ${targetPerson.platform}`);
    // Записываем интересы, соединяя их через |
    log(`ИНТЕРЕСЫ: ${targetPerson.interests.join(' | ')}`);
    // Записываем статус приватности
    log(`ПРИВАТНОСТЬ: ${targetPerson.isPrivate ? "ЗАКРЫТЫЙ ПРОФИЛЬ" : "ОТКРЫТ"}`);

    // Скрываем текущую кнопку
    this.classList.add('hidden');
    // Создаем новую кнопку для следующего шага
    const nextBtn = document.createElement('button');
    // Добавляем класс для стиля кнопки
    nextBtn.className = 'cyber-btn';
    // Устанавливаем текст кнопки
    nextBtn.textContent = 'ШАГ 2: ПОИСК ВЕКТОРА АТАКИ';
    // Назначаем действие на клик по кнопке
    nextBtn.onclick = () => startStep2();
    // Добавляем кнопку в область управления
    controls.appendChild(nextBtn);
};

// Функция для запуска второго шага
function startStep2() {
    // Массив с возможными уязвимостями (способами взлома)
    const vulnerabilities = [
        { type: "Phishing", successRate: 20, description: "Отправка ссылки на фейковый вход" }, // Фишинг: обманная ссылка
        { type: "Social Engineering", successRate: 50, description: "Сброс пароля через 'имя питомца'" }, // Социальная инженерия: использование личной информации
        { type: "Brute Force", successRate: 90, description: "Прямой перебор по словарю" } // Брутфорс: перебор паролей
    ];

    // Записываем в лог, что анализируем векторы атаки
    log("АНАЛИЗ ВОЗМОЖНЫХ ВЕКТОРОВ АТАКИ...", "success");

    // Цикл для вывода всех уязвимостей
    for (let i = 0; i < vulnerabilities.length; i++) {
        // Получаем текущую уязвимость
        let v = vulnerabilities[i];
        // Записываем информацию о векторе
        log(`Вектор [${i}]: ${v.type} (${v.successRate}% шанс)`);
    }

    // Записываем, что выбран брутфорс как наиболее эффективный
    log("ВЫБРАН НАИБОЛЕЕ ЭФФЕКТИВНЫЙ: Brute Force", "success");

    // Очищаем область управления
    controls.innerHTML = '';
    // Создаем новую кнопку для третьего шага
    const nextBtn = document.createElement('button');
    // Добавляем класс для стиля
    nextBtn.className = 'cyber-btn';
    // Устанавливаем текст
    nextBtn.textContent = 'ШАГ 3: ЗАПУСК ПЕРЕБОРА';
    // Назначаем действие
    nextBtn.onclick = () => startStep3();
    // Добавляем кнопку
    controls.appendChild(nextBtn);
}

// Функция для запуска третьего шага
function startStep3() {
    // Массив с распространенными паролями
    const commonPasswords = ["12345", "football2024", "ivan1995", "instapass", "password"];

    // Записываем, что подключаемся к API
    log("ПОДКЛЮЧЕНИЕ К API ПРОТОКОЛУ...");

    // Счетчик для перебора паролей
    let i = 0;
    // Запускаем интервал для имитации перебора
    const interval = setInterval(() => {
        // Если еще есть пароли в списке
        if (i < commonPasswords.length) {
            // Получаем текущий пароль
            const pass = commonPasswords[i];
            // Записываем попытку подбора
            log(`Подбор пароля: ${pass}...`);

            // Проверяем, совпадает ли зашифрованный пароль с секретом
            if (btoa(pass) === secretHash) {
                // Если да, записываем успех
                log(`[!!!] ПАРОЛЬ ПОДОШЕЛ: ${pass}`, "success");
                // Записываем, что доступ открыт
                log("ДОСТУП К ЛИЧНЫМ СООБЩЕНИЯМ ОТКРЫТ.", "success");
                // Останавливаем интервал
                clearInterval(interval);
                // Завершаем взлом
                finishHack();
            } else {
                // Если нет, записываем ошибку
                log("ОШИБКА АВТОРИЗАЦИИ", "error");
            }
            // Увеличиваем счетчик
            i++;
        } else {
            // Если пароли кончились, останавливаем интервал
            clearInterval(interval);
            // Записываем, что взлом прерван
            log("ВЗЛОМ ПРЕРВАН: СЛОВАРЬ ИСЧЕРПАН", "error");
        }
    }, 600); // Каждые 600 миллисекунд
}

// Функция для завершения взлома
function finishHack() {
    // Заменяем содержимое области управления на заголовок "ВЗЛОМ ЗАВЕРШЕН"
    controls.innerHTML = '<h2 style="text-align:center; color:#fff">ВЗЛОМ ЗАВЕРШЕН</h2>';
}