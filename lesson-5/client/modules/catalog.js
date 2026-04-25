// === catalog.js ===
// Модуль для отображения каталога товаров

const container = document.querySelector('#goods-container');

/**
 * Отрисовать товары в контейнер
 */
function renderGoods(data) {
    if (!container) {
        console.error("Контейнер товаров не найден");
        return;
    }
    
    container.innerHTML = "";
    
    if (data.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Товаров не найдено</div>';
        return;
    }
    
    data.forEach(good => {
        const discount = Math.round(((good.oldPrice - good.price) / good.oldPrice) * 100);
        
        const html = `
            <div class="card" onclick="openModal(${good.id})">
                <div style="position: relative;">
                    <img src="${good.img}" class="card-img" alt="${good.title}">
                    <span class="discount-badge">-${discount}%</span>
                </div>
                <div class="card-info">
                    <div class="price-row">
                        <span class="price-current">${good.price} ₽</span>
                        <span class="price-old">${good.oldPrice} ₽</span>
                    </div>
                    <div class="card-brand">${good.brand}</div>
                    <div class="card-title">${good.title}</div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', html);
    });
    
    console.log("✓ Отрисовано товаров:", data.length);
}

/**
 * Открыть модальное окно товара
 */
function openModal(id) {
    const good = getGoodById(id);
    if (!good) {
        console.error("Товар не найден");
        return;
    }
    
    const modal = document.querySelector('#modal');
    const modalBody = document.querySelector('#modal-body');
    
    const html = `
        <img src="${good.img}" class="modal-img" alt="${good.title}">
        <div style="flex: 1;">
            <h2>${good.brand}</h2>
            <p style="font-size: 18px; color: #666;">${good.title}</p>
            <h1 style="color: #cb11ab; margin-top: 20px;">${good.price} ₽</h1>
            <p style="margin-top: 20px;">Рейтинг: ★ ${good.rating}</p>
            <button class="btn-primary" onclick="addToCartAndClose(${good.id})">Добавить в корзину</button>
        </div>
    `;
    
    modalBody.innerHTML = html;
    modal.classList.add('open');
}

/**
 * Закрыть модальное окно
 */
function closeModal() {
    const modal = document.querySelector('#modal');
    modal.classList.remove('open');
}

/**
 * Добавить товар в корзину и закрыть модаль
 */
function addToCartAndClose(id) {
    addToCart(id);
    alert('Добавлено в корзину!');
    closeModal();
}
