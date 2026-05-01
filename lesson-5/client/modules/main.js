// === main.js ===
// Главный модуль приложения - инициализация и старт

/**
 * Инициализировать все модули при загрузке страницы
 */
async function initApp() {
    console.log("🚀 Инициализация приложения...");
    
    // 1. Инициализируем корзину (загружаем из localStorage)
    initCart();
    
    // 2. Загружаем товары с сервера
    await loadGoods();
    
    // 3. Отрисовываем товары
    renderGoods(getAllGoods());
    
    // 4. Инициализируем категории из данных
    initCategories();
    
    // 5. Инициализируем поиск в хедере
    initSearch();
    
    // 6. Инициализируем админ-панель
    initAdmin();
    
    console.log("✓ Приложение готово к работе!");
}

// Запускаем приложение при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
