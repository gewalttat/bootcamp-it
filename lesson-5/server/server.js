const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_PATH = path.join(__dirname, 'db.json');

// npm init -y
// npm install express cors

// Мидлвары
app.use(cors()); // Чтобы фронтенд мог достучаться
app.use(express.json()); // Чтобы сервер понимал JSON в теле запроса

// Хелпер для чтения/записи БД
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Инициализация файла базы данных, если его нет
if (!fs.existsSync(DB_PATH)) {
    writeDB([
        { id: 1, brand: "Apple", name: "iPhone 15", price: 95000, image: "https://via.placeholder.com/200" },
        { id: 2, brand: "Samsung", name: "Galaxy S23", price: 80000, image: "https://via.placeholder.com/200" }
    ]);
}

// --- API ROUTES ---
// 1. GET: Получить все карточки
app.get('/api/products', (req, res) => {
    try {
        const products = readDB();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Ошибка чтения базы данных" });
    }
});

// 2. POST: Добавить новую карточку
app.post('/api/products', (req, res) => {
    const products = readDB();
    const newProduct = {
        id: Date.now(), // Генерируем ID на основе времени
        ...req.body
    };
    products.push(newProduct);
    writeDB(products);
    res.status(201).json(newProduct);
});

// 3. PUT: Изменить карточку целиком
app.put('/api/products/:id', (req, res) => {
    const products = readDB();
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body };
        writeDB(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ error: "Товар не найден" });
    }
});

// 4. DELETE: Удалить карточку
app.delete('/api/products/:id', (req, res) => {
    let products = readDB();
    const initialLength = products.length;
    products = products.filter(p => p.id !== parseInt(req.params.id));
    
    if (products.length < initialLength) {
        writeDB(products);
        res.json({ message: "Удалено успешно" });
    } else {
        res.status(404).json({ error: "Товар не найден" });
    }
});

app.listen(PORT, () => {
    console.log(`--- КЛОН WB СЕРВЕР ЗАПУЩЕН ---`);
    console.log(`Адрес API: http://localhost:${PORT}/api/products`);
});