// === filter.js ===
// Модуль для фильтрации и сортировки товаров

/**
 * Фильтровать товары по категории
 */
function filterCategory(categoryName) {
    const filtered = getGoodsByCategory(categoryName);
    renderGoods(filtered);
    
    // Обновляем активную кнопку
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === categoryName) {
            btn.classList.add('active');
        }
    });
    
    console.log("✓ Фильтр по категории:", categoryName);
}

/**
 * Сортировать товары по цене
 */
function sortByPrice(order) {
    const sorted = [...getAllGoods()].sort((a, b) => {
        if (order === 'asc') return a.price - b.price;
        return b.price - a.price;
    });
    renderGoods(sorted);
    
    const label = order === 'asc' ? 'возрастанию' : 'убыванию';
    console.log("✓ Сортировка по цене:", label);
}

/**
 * Сортировать товары по рейтингу
 */
function sortByRating() {
    const sorted = [...getAllGoods()].sort((a, b) => b.rating - a.rating);
    renderGoods(sorted);
    console.log("✓ Сортировка по рейтингу");
}

/**
 * Сортировать товары по скидке
 */
function sortByDiscount() {
    const sorted = [...getAllGoods()].sort((a, b) => {
        const discountA = ((a.oldPrice - a.price) / a.oldPrice) * 100;
        const discountB = ((b.oldPrice - b.price) / b.oldPrice) * 100;
        return discountB - discountA;
    });
    renderGoods(sorted);
    console.log("✓ Сортировка по скидке");
}

/**
 * Фильтровать товары по цене (диапазон)
 */
function filterByPrice(minPrice, maxPrice) {
    const filtered = getAllGoods().filter(good => 
        good.price >= minPrice && good.price <= maxPrice
    );
    renderGoods(filtered);
    console.log(`✓ Фильтр по цене: ${minPrice} - ${maxPrice}`);
}

/**
 * Фильтровать товары по минимальному рейтингу
 */
function filterByRating(minRating) {
    const filtered = getAllGoods().filter(good => good.rating >= minRating);
    renderGoods(filtered);
    console.log(`✓ Фильтр по рейтингу: от ${minRating}`);
}
