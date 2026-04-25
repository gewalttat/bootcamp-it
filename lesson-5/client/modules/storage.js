// === storage.js ===
// Модуль для управления локальным хранилищем (localStorage)

const STORAGE_KEYS = {
    CART: 'cartItems',
    FAVORITES: 'favoriteItems',
    SETTINGS: 'userSettings'
};

/**
 * Сохранить корзину в localStorage
 */
function saveCart(cartItems) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
    console.log("✓ Корзина сохранена");
}

/**
 * Загрузить корзину из localStorage
 */
function loadCart() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.CART);
        if (saved) {
            console.log("✓ Корзина загружена из памяти");
            return JSON.parse(saved);
        }
    } catch (error) {
        console.error("✗ Ошибка загрузки корзины:", error);
    }
    return [];
}

/**
 * Очистить корзину
 */
function clearCart() {
    localStorage.removeItem(STORAGE_KEYS.CART);
    console.log("✓ Корзина очищена");
}

/**
 * Сохранить избранное
 */
function saveFavorites(favorites) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

/**
 * Загрузить избранное
 */
function loadFavorites() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("✗ Ошибка загрузки избранного:", error);
        return [];
    }
}

/**
 * Удалить из localStorage
 */
function removeFromStorage(key) {
    localStorage.removeItem(key);
    console.log("✓ Данные удалены");
}
