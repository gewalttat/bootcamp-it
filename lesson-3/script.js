const display = document.getElementById('display');
const controls = document.getElementById('controls');
const secretHash = "aW5zdGFwYXNz";

function log(text, type = '') {
    const p = document.createElement('p');
    p.className = `log-entry ${type}`;
    p.textContent = `> ${text}`;
    display.appendChild(p);
    display.scrollTop = display.scrollHeight;
}

// Назначаем действие на кнопку с id 'step-1'
document.getElementById('step-1').onclick = function() {
    const targetPerson = {
        name: "Иван Иванов",
        platform: "Instagram",
        stats: { followers: 450, posts: 12 },
        interests: ["football", "gaming", "pizza"],
        isPrivate: true
    };

    log(`ОБЪЕКТ ИДЕНТИФИЦИРОВАН: ${targetPerson.name.toUpperCase()}`);
    log(`СОЦИАЛЬНАЯ СЕТЬ: ${targetPerson.platform}`);
    log(`ИНТЕРЕСЫ: ${targetPerson.interests.join(' | ')}`);
    log(`ПРИВАТНОСТЬ: ${targetPerson.isPrivate ? "ЗАКРЫТЫЙ ПРОФИЛЬ" : "ОТКРЫТ"}`);

    this.classList.add('hidden');
    const nextBtn = document.createElement('button');
    nextBtn.className = 'cyber-btn';
    nextBtn.textContent = 'ШАГ 2: ПОИСК ВЕКТОРА АТАКИ';
    nextBtn.onclick = () => startStep2();
    controls.appendChild(nextBtn);
};

function startStep2() {
    const vulnerabilities = [
        { type: "Phishing", successRate: 20, description: "Отправка ссылки на фейковый вход" },
        { type: "Social Engineering", successRate: 50, description: "Сброс пароля через 'имя питомца'" },
        { type: "Brute Force", successRate: 90, description: "Прямой перебор по словарю" }
    ];

    log("АНАЛИЗ ВОЗМОЖНЫХ ВЕКТОРОВ АТАКИ...", "success");

    for (let i = 0; i < vulnerabilities.length; i++) {
        let v = vulnerabilities[i];
        log(`Вектор [${i}]: ${v.type} (${v.successRate}% шанс)`);
    }

    log("ВЫБРАН НАИБОЛЕЕ ЭФФЕКТИВНЫЙ: Brute Force", "success");

    controls.innerHTML = '';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'cyber-btn';
    nextBtn.textContent = 'ШАГ 3: ЗАПУСК ПЕРЕБОРА';
    nextBtn.onclick = () => startStep3();
    controls.appendChild(nextBtn);
}

function startStep3() {
    const commonPasswords = ["12345", "football2024", "ivan1995", "instapass", "password"];

    log("ПОДКЛЮЧЕНИЕ К API ПРОТОКОЛУ...");

    let i = 0;
    const interval = setInterval(() => {
        if (i < commonPasswords.length) {
            const pass = commonPasswords[i];
            log(`Подбор пароля: ${pass}...`);

            if (btoa(pass) === secretHash) {
                log(`[!!!] ПАРОЛЬ ПОДОШЕЛ: ${pass}`, "success");
                log("ДОСТУП К ЛИЧНЫМ СООБЩЕНИЯМ ОТКРЫТ.", "success");
                clearInterval(interval);
                finishHack();
            } else {
                log("ОШИБКА АВТОРИЗАЦИИ", "error");
            }
            i++;
        } else {
            clearInterval(interval);
            log("ВЗЛОМ ПРЕРВАН: СЛОВАРЬ ИСЧЕРПАН", "error");
        }
    }, 600); 
}

function finishHack() {
    controls.innerHTML = '<h2 style="text-align:center; color:#fff">ВЗЛОМ ЗАВЕРШЕН</h2>';
}