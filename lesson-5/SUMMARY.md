# 📚 WB Junior Clone - Саммари проекта для студентов

## 🎯 Быстрый обзор

**WB Junior Clone** — это полнофункциональное e-commerce веб-приложение (упрощенный клон Wildberries), которое демонстрирует современную архитектуру веб-приложений и ключевые концепции веб-разработки.

**Длительность презентации:** 10-15 минут  
**Уровень:** Начинающие разработчики (bootcamp, начальные курсы)

---

## 🔧 Технологический стек

### Frontend (Клиентская часть)
- **HTML5** — семантическая разметка
- **CSS3** — Grid, Flexbox, адаптивный дизайн
- **Vanilla JavaScript (ES6+)** — логика приложения без фреймворков
- **Fetch API** — HTTP запросы к серверу
- **localStorage** — локальное хранилище данных браузером

### Backend (Серверная часть)
- **Node.js** — JavaScript runtime для сервера
- **Express.js** — легкий веб-фреймворк
- **CORS** — разрешение кроссдоменных запросов
- **fs модуль** — работа с файловой системой
- **JSON** — база данных (db.json файл)

### Инструменты
- **npm** — менеджер пакетов Node.js
- **package.json** — конфигурация проекта
- **REST API** — архитектурный стиль для веб-сервисов

---

## 🏗️ Архитектурное решение

### Общая схема 
```
┌─────────────────────────────┐
│  БРАУЗЕР (Frontend Layer)   │
│  ├─ index.html              │
│  ├─ style.css               │
│  └─ modules/ (8 JS файлов)  │
└──────────┬──────────────────┘
           │ HTTP (REST API)
           ↓
┌─────────────────────────────┐
│  EXPRESS SERVER             │
│  ├─ GET /api/products       │
│  ├─ POST /api/products      │
│  ├─ PUT /api/products/:id   │
│  └─ DELETE /api/products/:id│
└──────────┬──────────────────┘
           │ File System
           ↓
       ┌────────┐
       │db.json │ (База данных)
       └────────┘
```

### Архитектурные паттерны

1. **Клиент-Серверная архитектура**
   - Frontend отделен от Backend
   - Взаимодействие через REST API

2. **Модульная архитектура Frontend**
   - Каждый модуль отвечает за одну задачу
   - Легко масштабировать и тестировать

3. **MVC-подобный паттерн**
   - Model: api.js (структура данных)
   - View: catalog.js, header.js (отображение)
   - Controller: filter.js, cart.js (логика)

---

## 📁 Структура проекта

```
lesson-5/
├── client/
│   ├── index.html            # Главная страница
│   ├── style.css             # Стили
│   ├── images/               # Картинки товаров
│   └── modules/
│       ├── main.js           # 🚀 Инициализация приложения
│       ├── api.js            # 🌐 Работа с сервером
│       ├── storage.js        # 💾 localStorage
│       ├── catalog.js        # 📺 Отрисовка товаров
│       ├── cart.js           # 🛒 Корзина
│       ├── filter.js         # 🔍 Фильтрация/сортировка
│       ├── header.js         # 📋 Хедер и поиск
│       └── admin.js          # 👨 Управление товарами
├── server/
│   ├── server.js             # Express сервер
│   ├── db.json               # База данных (JSON)
│   └── package.json          # Зависимости
└── PRESENTATION.html         # Эта презентация
```

---

## 🧩 Модули JavaScript (Frontend)

### 1. api.js — Работа с сервером
**Отвечает за:** HTTP запросы к серверу, загрузку данных
- `loadGoods()` — загрузить товары с сервера (GET /api/products)
- `addProduct(product)` — добавить товар (POST /api/products)
- `deleteProduct(id)` — удалить товар (DELETE /api/products/:id)

**Технология:** Fetch API, Promises/async-await

```javascript
async function loadGoods() {
    const response = await fetch('http://localhost:3000/api/products');
    return await response.json();
}
```

### 2. storage.js — Локальное хранилище
**Отвечает за:** Сохранение данных на клиенте (браузер)
- `saveCart(cartItems)` — сохранить корзину
- `loadCart()` — загрузить корзину
- `clearCart()` — очистить корзину

**Технология:** localStorage API

```javascript
function saveCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
}
```

### 3. cart.js — Управление корзиной
**Отвечает за:** Логика работы с корзиной товаров
- `addToCart(id)` — добавить товар в корзину
- `removeFromCart(index)` — удалить товар из корзины
- `getCartTotal()` — сумма всех товаров
- `clearAllCart()` — очистить корзину

### 4. catalog.js — Отрисовка товаров
**Отвечает за:** Отображение товаров на странице
- `renderGoods(data)` — вывести товары в HTML
- `openModal(id)` — открыть карточку товара
- `closeModal()` — закрыть карточку

### 5. filter.js — Фильтрация и сортировка
**Отвечает за:** Фильтры по категориям, сортировка по цене/рейтингу
- `filterCategory(name)` — фильтр по категории
- `sortByPrice(order)` — сортировка по цене (возрастание/убывание)
- `sortByRating()` — сортировка по рейтингу
- `sortByDiscount()` — сортировка по скидке

### 6. header.js — Хедер и поиск
**Отвечает за:** Функции хедера, поиск товаров, корзина
- `initSearch()` — инициализировать поиск
- `searchGoods(query)` — поиск по названию/бренду
- `openCart()` — открыть модаль корзины
- `updateCartCounter()` — обновить счетчик товаров

### 7. admin.js — Управление товарами (НОВОЕ!)
**Отвечает за:** Добавление и удаление товаров через админ-панель
- `openAddProductModal()` — открыть форму
- `addProductToServer(product)` — POST запрос на сервер
- `deleteProductFromServer(id)` — DELETE запрос

### 8. main.js — Инициализация
**Отвечает за:** Точка входа приложения, загрузка всех модулей
- Инициализирует все компоненты при загрузке страницы
- Загружает товары с сервера
- Восстанавливает корзину из localStorage

---

## 🖥️ Backend: Express.js (Node.js)

### Структура server.js
```javascript
const express = require('express');     // Фреймворк
const cors = require('cors');           // Разрешение кроссдоменных запросов
const fs = require('fs');               // Работа с файлами

const app = express();
const PORT = 3000;

// Мидлвары (middleware)
app.use(cors());                        // Разрешаем запросы с фронтенда
app.use(express.json());                // Парсим JSON в запросах
```

### REST API Endpoints

| Метод  | Endpoint | Описание |
|--------|----------|---------|
| GET    | `/api/products` | Получить все товары |
| POST   | `/api/products` | Добавить новый товар |
| PUT    | `/api/products/:id` | Обновить товар |
| DELETE | `/api/products/:id` | Удалить товар |

### Пример API запроса (Frontend)
```javascript
// GET запрос
const products = await fetch('http://localhost:3000/api/products')
    .then(res => res.json());

// POST запрос (добавить товар)
await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        title: 'iPhone 15',
        price: 95000,
        brand: 'Apple'
    })
});

// DELETE запрос (удалить товар)
await fetch('http://localhost:3000/api/products/123', {
    method: 'DELETE'
});
```

### База данных (db.json)
Простой JSON файл вместо SQL базы (удобно для обучения)

```json
[
  {
    "id": 1,
    "category": "Электроника",
    "title": "Смартфон iPhone 15",
    "brand": "Apple",
    "price": 95000,
    "oldPrice": 120000,
    "rating": 4.9,
    "img": "images/12.webp"
  },
  ...
]
```

---

## 🔄 Поток данных (Data Flow)

### 1️⃣ Загрузка товаров при открытии приложения
```
main.js 
  ↓ (вызывает)
loadGoods() из api.js
  ↓ (отправляет HTTP GET)
Express Server
  ↓ (читает)
db.json
  ↓ (возвращает JSON)
renderGoods() из catalog.js
  ↓ (отрисовывает)
HTML в браузер
```

### 2️⃣ Добавление товара в корзину
```
Пользователь нажимает "Добавить в корзину"
  ↓
cart.js: addToCart(id)
  ↓
storage.js: saveCart() → localStorage браузера
  ↓
header.js: updateCartCounter() → обновить счетчик в UI
```

### 3️⃣ Создание нового товара (Админ-панель)
```
Форма в admin.js (openAddProductModal)
  ↓
Пользователь вводит данные и нажимает "Добавить"
  ↓
api.js: addProduct() → POST запрос на сервер
  ↓
Express Server: app.post('/api/products')
  ↓
Запись в db.json: writeDB()
  ↓
Response с новым товаром → loadGoods()
  ↓
catalog.js: renderGoods() → добавить в каталог
```

---

## 🚀 Как запустить проект

### Шаг 1: Установка зависимостей сервера
```bash
cd server
npm install
```

### Шаг 2: Запуск Express сервера
```bash
npm start
# Сервер запущен на http://localhost:3000
```

### Шаг 3: Открыть фронтенд
```bash
cd ../client
# Открыть index.html в браузере (или использовать Live Server)
```

---

## 💡 Ключевые концепции для студентов

### 1. Модульность (Modularity)
- Код разбит на логические части (модули)
- Каждый модуль отвечает за одну задачу (Single Responsibility Principle)
- Легче тестировать, отладить и переиспользовать

### 2. REST API и HTTP методы
- **GET** — получение данных (безопасно, идемпотентно)
- **POST** — создание новых ресурсов
- **PUT/PATCH** — обновление ресурсов
- **DELETE** — удаление ресурсов

### 3. Асинхронность (Async Programming)
- Операции с сетью не блокируют UI
- Fetch API возвращает Promise
- `async/await` синтаксис делает код читаемее

```javascript
// Promise
fetch(url).then(res => res.json()).then(data => {
    // обработка данных
});

// async/await (современный подход)
const data = await fetch(url).then(res => res.json());
```

### 4. Локальное хранилище (localStorage)
- Сохранение данных в браузере
- Данные сохраняются между сеансами
- Альтернатива куки, но проще для использования

```javascript
// Сохранить
localStorage.setItem('cart', JSON.stringify(cartItems));

// Загрузить
const items = JSON.parse(localStorage.getItem('cart'));
```

### 5. Разделение ответственности (Separation of Concerns)
- Frontend отвечает за UI и взаимодействие пользователя
- Backend отвечает за бизнес-логику и хранение данных
- API — контракт между ними

---

## 🎓 Что учащиеся изучат на этом проекте

- ✅ **HTML5 и CSS3** — структура и стилизация веб-страниц
- ✅ **Vanilla JavaScript** — DOM, события, модули, async/await
- ✅ **Frontend архитектура** — организация кода, паттерны
- ✅ **REST API** — как работает взаимодействие между фронтом и бэком
- ✅ **Node.js и Express.js** — как создавать веб-сервер
- ✅ **HTTP и CORS** — протокол общения в интернете
- ✅ **JSON и файловая система** — хранение данных
- ✅ **DevTools** — отладка через консоль браузера, Network tab
- ✅ **npm и package.json** — управление зависимостями

---

## 🔥 Интересные факты и обсуждение

### Почему Vanilla JavaScript?
- Нет зависимости от фреймворков
- Лучше понять как работает JavaScript
- Все концепции применимы к React, Vue, Angular

### Почему Express.js?
- Легкий и гибкий фреймворк
- Идеален для обучения
- В production используется для реальных приложений

### Почему JSON вместо SQL БД?
- Проще для обучения (не нужно устанавливать SQL)
- Все данные в одном понятном файле
- В реальных проектах используют PostgreSQL, MySQL, MongoDB

### CORS - что это?
- **Cross-Origin Resource Sharing** — разрешение браузеру делать запросы на другой домен
- Защитная мера браузера (Same-Origin Policy)
- Express с `cors()` модулем разрешает это

---

## 🚀 Возможности расширения проекта

Студенты могут улучшить проект:

1. **Аутентификация**
   - Логин/пароль
   - JWT токены
   - Роли пользователей (admin, user)

2. **Настоящая база данных**
   - PostgreSQL или MongoDB вместо JSON файла
   - ORM (Sequelize, TypeORM, Prisma)

3. **Frontend фреймворк**
   - Переписать на React или Vue.js
   - Лучше управление состоянием

4. **Платежи**
   - Интеграция Stripe или Yandex.Kassa
   - Обработка платежей

5. **Тестирование**
   - Unit тесты (Jest, Mocha)
   - E2E тесты (Cypress, Playwright)

6. **Деплоймент**
   - Heroku, AWS, Azure, DigitalOcean
   - Разместить в интернете

7. **Дополнительные фичи**
   - Рейтинговая система
   - Избранное (Favorites)
   - История покупок
   - Email уведомления

---

## 📊 Размер проекта

- **Frontend код:** ~8 модулей JS
- **Backend код:** ~1 сервер + 1 БД файл
- **HTML/CSS:** 1 страница + стили
- **Всего:** очень компактный, легко понять

---

## 🎯 Выводы

**WB Junior Clone** демонстрирует:
1. Как работает реальное веб-приложение
2. Взаимодействие Frontend ↔ Backend
3. Ценность модульной архитектуры
4. Современные технологии веб-разработки
5. Все концепции применяются в production коде

**Это отличная стартовая точка для начинающих разработчиков!**

---

## 📚 Дополнительные ссылки для студентов

- [MDN Web Docs](https://developer.mozilla.org) — полная документация HTML/CSS/JS
- [Express.js документация](https://expressjs.com)
- [Node.js документация](https://nodejs.org/docs)
- [REST API принципы](https://restfulapi.net)
- [CORS объяснение](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Создано:** 2026  
**Для:**  Bootcamp студентов  
**Язык:** Русский  
**Статус:** Готово к презентации ✅
