let currentMode = 'github';

const display = document.getElementById('display');
const resultCard = document.getElementById('result-card');
const targetInput = document.getElementById('targetInput');
const traceBtn = document.getElementById('traceBtn');
const promptText = document.getElementById('prompt-text');

const configs = {
    github: { prompt: 'root@github:~#', hint: 'username (напр. gaearon)...' },
    crypto: { prompt: 'root@coingecko:~#', hint: 'coin id (напр. bitcoin)...' },
    weather: { prompt: 'root@meteo_unit:~#', hint: 'город (напр. Moscow, Berlin)...' }
};

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${mode}`).classList.add('active');

    promptText.textContent = configs[mode].prompt;
    targetInput.placeholder = configs[mode].hint;
    log(`МОДУЛЬ ${mode.toUpperCase()} АКТИВИРОВАН`, 'success');
}

function log(text, type = '') {
    const p = document.createElement('p');
    p.className = `log-entry ${type}`;
    p.textContent = `> ${text}`;
    display.appendChild(p);
    display.scrollTop = display.scrollHeight;
}

async function executeRequest() {
    const input = targetInput.value.trim();
    if (!input) return log("ОШИБКА: ПУСТОЙ ЗАПРОС", "error");

    resultCard.classList.add('hidden');
    log(`УСТАНОВКА СОЕДИНЕНИЯ С СЕРВЕРОМ...`);

    let url = '';
    
    try {
        if (currentMode === 'github') {
            url = `https://api.github.com/users/${input}`;
        } else if (currentMode === 'crypto') {
            url = `https://api.coingecko.com/api/v3/simple/price?ids=${input.toLowerCase()}&vs_currencies=usd`;
        } else if (currentMode === 'weather') {
            // Сначала получаем координаты города через Геокодинг (тоже Open-Meteo)
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=1&language=en&format=json`;
            const geoRes = await fetch(geoUrl);
            const geoData = await geoRes.json();
            
            if (!geoData.results) throw new Error("ЛОКАЦИЯ НЕ НАЙДЕНА");
            
            const { latitude, longitude, name } = geoData.results[0];
            log(`КООРДИНАТЫ ПОЛУЧЕНЫ: ${latitude}, ${longitude}`, "success");
            
            // Теперь тянем саму погоду по координатам
            url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            // Передаем имя города дальше для отрисовки
            dataName = name; 
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("УЗЕЛ НЕ ОТВЕЧАЕТ");
        
        const data = await response.json();
        log("ПАКЕТ ДАННЫХ ДЕШИФРОВАН", "success");
        renderData(data, input);

    } catch (err) {
        log(`КРИТИЧЕСКИЙ СБОЙ: ${err.message}`, "error");
    }
}

function renderData(data, input) {
    resultCard.classList.remove('hidden');
    let html = '';

    if (currentMode === 'github') {
        html = `
            <img src="${data.avatar_url}" style="width:70px; border:1px solid #0f0; float:right">
            <h2>USER: ${data.login}</h2>
            <p>STATUS: ${data.bio || 'SECURED'}</p>
            <p>PUBLIC_REPOS: <span>${data.public_repos}</span></p>
        `;
    } else if (currentMode === 'crypto') {
        const coin = input.toLowerCase();
        if (!data[coin]) return log("ДАННЫЕ О ВАЛЮТЕ ОТСУТСТВУЮТ", "error");
        html = `
            <h2>ASSET: ${coin.toUpperCase()}</h2>
            <p>MARKET_PRICE: <span>$${data[coin].usd}</span></p>
            <p>SENSORS: ONLINE</p>
        `;
    } else if (currentMode === 'weather') {
        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        html = `
            <h2>LOCATION: ${input.toUpperCase()}</h2>
            <p>TEMPERATURE: <span>${temp}°C</span></p>
            <p>WIND_SPEED: <span>${wind} km/h</span></p>
            <p>STATUS: ATMOSPHERE_STABLE</p>
        `;
    }

    resultCard.innerHTML = html;
}

traceBtn.onclick = executeRequest;
targetInput.onkeypress = (e) => { if(e.key === 'Enter') executeRequest(); };