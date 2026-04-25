// === admin.js ===
// Модуль для управления товарами (добавление, редактирование, удаление)

/**
 * Инициализировать админ-панель
 */
function initAdmin() {
    initAddProductForm();
    console.log("✓ Админ-панель инициализирована");
}

/**
 * Инициализировать форму добавления товара
 */
function initAddProductForm() {
    const form = document.querySelector('#add-product-form');
    if (!form) return;
    
    form.addEventListener('submit', handleAddProduct);
}

/**
 * Обработать отправку формы добавления товара
 */
async function handleAddProduct(e) {
    e.preventDefault();
    
    // Получить данные из формы
    const form = e.target;
    const formData = new FormData(form);
    
    const newProduct = {
        category: formData.get('category'),
        title: formData.get('title'),
        brand: formData.get('brand'),
        price: parseInt(formData.get('price')),
        oldPrice: parseInt(formData.get('oldPrice')),
        rating: parseFloat(formData.get('rating')),
        img: formData.get('img')
    };
    
    // Валидация
    if (!validateProduct(newProduct)) {
        alert('❌ Заполните все поля корректно');
        return;
    }
    
    // Отправить на сервер
    const success = await addProductToServer(newProduct);
    
    if (success) {
        alert('✓ Товар успешно добавлен!');
        form.reset();
        
        // Перезагрузить товары
        await loadGoods();
        renderGoods(getAllGoods());
        
        // Закрыть модаль
        closeAddProductModal();
    }
}

/**
 * Валидировать данные товара
 */
function validateProduct(product) {
    if (!product.category || !product.title || !product.brand) return false;
    if (!product.price || !product.oldPrice || product.price <= 0) return false;
    if (!product.rating || product.rating < 0 || product.rating > 5) return false;
    if (!product.img) return false;
    return true;
}

/**
 * Добавить товар на сервер
 */
async function addProductToServer(product) {
    try {
        const response = await fetch('http://localhost:3000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        
        if (!response.ok) throw new Error('Ошибка при добавлении товара');
        
        const createdProduct = await response.json();
        console.log("✓ Товар добавлен на сервер:", createdProduct);
        return true;
    } catch (error) {
        console.error("✗ Ошибка отправки товара:", error);
        alert('❌ Ошибка при добавлении товара на сервер');
        return false;
    }
}

/**
 * Удалить товар с сервера
 */
async function deleteProductFromServer(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) throw new Error('Ошибка при удалении товара');
        
        console.log("✓ Товар удалён с сервера, ID:", id);
        
        // Перезагрузить товары
        await loadGoods();
        renderGoods(getAllGoods());
        
        return true;
    } catch (error) {
        console.error("✗ Ошибка удаления товара:", error);
        alert('❌ Ошибка при удалении товара');
        return false;
    }
}

/**
 * Открыть модаль для добавления товара
 */
function openAddProductModal() {
    const modal = document.querySelector('#add-product-modal');
    if (modal) {
        modal.classList.add('open');
    }
}

/**
 * Закрыть модаль для добавления товара
 */
function closeAddProductModal() {
    const modal = document.querySelector('#add-product-modal');
    if (modal) {
        modal.classList.remove('open');
    }
}

/**
 * Удалить товар (с подтверждением)
 */
function deleteProduct(id) {
    const good = getGoodById(id);
    if (!good) return;
    
    const confirmed = confirm(`Удалить товар "${good.title}"?`);
    
    if (confirmed) {
        deleteProductFromServer(id);
    }
}

/**
 * Получить пример картинки из Unsplash
 */
function getRandomImageUrl() {
    const queries = ['shirt', 'shoes', 'sneakers', 'phone', 'laptop', 'headphones', 'backpack'];
    const query = queries[Math.floor(Math.random() * queries.length)];
    return `https://images.unsplash.com/photo-1${Math.random().toString().slice(2, 10)}?auto=format&fit=crop&w=400&q=80`;
}

/**
 * Заполнить случайную картинку
 */
function fillRandomImage() {
    const imgInput = document.querySelector('input[name="img"]');
    if (imgInput) {
        imgInput.value = getRandomImageUrl();
    }
}
