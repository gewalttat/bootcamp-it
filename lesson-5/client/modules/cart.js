// === cart.js ===
// Модуль для управления корзиной товаров

let cartItems = [];

/**
 * Инициализировать корзину
 */
function initCart() {
    cartItems = loadCart();
    updateCartCounter();
    console.log("✓ Корзина инициализирована, товаров:", cartItems.length);
}

/**
 * Добавить товар в корзину
 */
function addToCart(id) {
    const good = getGoodById(id);
    if (!good) {
        console.error("Товар не найден");
        return;
    }
    
    cartItems.push(good);
    saveCart(cartItems);
    updateCartCounter();
    console.log("✓ Товар добавлен в корзину:", good.title);
}

/**
 * Удалить товар из корзины по индексу
 */
function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        const removed = cartItems.splice(index, 1);
        saveCart(cartItems);
        updateCartCounter();
        console.log("✓ Товар удалён:", removed[0].title);
        refreshCart();
    }
}

/**
 * Очистить все товары из корзины
 */
function clearAllCart() {
    cartItems = [];
    clearCart();
    updateCartCounter();
    console.log("✓ Корзина полностью очищена");
    refreshCart();
}

/**
 * Получить количество товаров в корзине
 */
function getCartCount() {
    return cartItems.length;
}

/**
 * Получить сумму товаров в корзине
 */
function getCartTotal() {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
}

/**
 * Получить все товары корзины
 */
function getCartItems() {
    return [...cartItems];
}

/**
 * Обновить счетчик корзины в UI
 */
function updateCartCounter() {
    const counter = document.querySelector('#cart-counter');
    if (counter) {
        counter.textContent = cartItems.length;
    }
}

/**
 * Обновить отображение корзины
 */
function refreshCart() {
    openCart();
}
