// === api.js ===
// Модуль для работы с сервером и API

let goods = [];

/**
 * Загружает товары с сервера
 */
async function loadGoods() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        if (!response.ok) throw new Error('Ошибка загрузки товаров');
        goods = await response.json();
        console.log("✓ Товаров загружено с сервера:", goods.length);
        return goods;
    } catch (error) {
        console.error("✗ Ошибка загрузки:", error);
        console.warn("Сервер недоступен на http://localhost:3000");
        return [];
    }
}

/**
 * Получить товар по ID
 */
function getGoodById(id) {
    return goods.find(g => g.id === id);
}

/**
 * Получить все товары
 */
function getAllGoods() {
    return goods;
}

/**
 * Получить товары по категории
 */
function getGoodsByCategory(category) {
    if (category === 'Все') {
        return goods;
    }
    return goods.filter(good => good.category === category);
}

/**
 * Поиск товаров по названию/бренду
 */
function searchGoods(query) {
    const q = query.toLowerCase();
    return goods.filter(good => {
        return good.title.toLowerCase().includes(q) || 
               good.brand.toLowerCase().includes(q);
    });
}
