// === header.js ===
// Модуль для управления хедером и поиском

/**
 * Инициализировать поиск
 */
function initSearch() {
    const searchInput = document.querySelector('#search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = searchInput.value.toLowerCase();
            
            if (query.trim() === '') {
                renderGoods(getAllGoods());
            } else {
                const results = searchGoods(query);
                renderGoods(results);
                console.log(`✓ Поиск: "${query}", найдено ${results.length} товаров`);
            }
        });
        console.log("✓ Поиск инициализирован");
    }
}

/**
 * Открыть окно корзины
 */
function openCart() {
    const cartModal = document.querySelector('#cart-modal');
    const cartList = document.querySelector('#cart-list');
    const cartTotal = document.querySelector('#cart-total');
    
    if (!cartModal) return;
    
    cartList.innerHTML = "";
    let totalSum = 0;
    
    const items = getCartItems();
    
    if (items.length === 0) {
        cartList.innerHTML = "<p style='color: #999;'>Корзина пока пуста</p>";
    } else {
        items.forEach((item, index) => {
            totalSum += item.price;
            
            cartList.insertAdjacentHTML('beforeend', `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;">
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <img src="${item.img}" style="width: 40px; height: 40px; border-radius: 5px; object-fit: cover;">
                        <span>${item.title}</span>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <strong>${item.price} ₽</strong>
                        <button onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; border-radius: 5px; padding: 5px 10px; cursor: pointer; font-size: 12px;">✕</button>
                    </div>
                </div>
            `);
        });
    }
    
    cartTotal.textContent = totalSum;
    cartModal.classList.add('open');
}

/**
 * Закрыть окно корзины
 */
function closeCart() {
    const cartModal = document.querySelector('#cart-modal');
    cartModal.classList.remove('open');
}

/**
 * Обработать оформление заказа
 */
function checkoutOrder() {
    const items = getCartItems();
    if (items.length === 0) {
        alert('Корзина пуста');
        return;
    }
    
    const total = getCartTotal();
    const confirmed = confirm(`Оформить заказ на сумму ${total} ₽?`);
    
    if (confirmed) {
        alert('✓ Заказ успешно оформлен!');
        clearAllCart();
        closeCart();
    }
}
