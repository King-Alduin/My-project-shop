document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartModal = document.querySelector('.cart-modal');
    const viewCartBtn = document.querySelector('.view-cart-btn');
    const closeCartBtn = document.querySelector('.close-cart-btn');
    const cartItemsList = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalPriceElement = document.querySelector('.total-price');
    const placeOrderBtn = document.querySelector('.place-order-btn'); // Новая кнопка

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartCount = () => {
        cartCount.textContent = cart.length;
    };

    const updateTotalPrice = () => {
        const total = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
        totalPriceElement.textContent = `Сумма: ₸${total}`;
    };

    const renderCartItems = () => {
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerHTML = `${item.title} - ₸${item.price} <button class="remove-item-btn" data-id="${item.id}">Удалить</button>`;
            cartItemsList.appendChild(li);
        });
        updateTotalPrice();
    };

    const addToCart = (product) => {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    };

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                title: productCard.querySelector('.product-title').textContent,
                price: parseFloat(productCard.querySelector('.product-price').textContent.replace('₸', ''))
            };
            addToCart(product);
            alert('Товар добавлен в корзину!');
        });
    });

    viewCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        renderCartItems();
    });

    closeCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    cartItemsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const id = e.target.dataset.id;
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCartItems();
        }
    });

    placeOrderBtn.addEventListener('click', () => {
        alert('Ваш заказ принят');
        // Дополнительно можно очистить корзину
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    });

    updateCartCount();
});

document.addEventListener("DOMContentLoaded", function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    showSlide(currentSlide);
    setInterval(nextSlide, 3000); // Менять слайд каждые 3 секунды
});
document.addEventListener('DOMContentLoaded', function() {
    ymaps.ready(init);
    function init() {
        var map = new ymaps.Map("map", {
            center: [43.250383, 76.627694], // Координаты села Шамалган
            zoom: 12
        });

        var placemark = new ymaps.Placemark([43.250383, 76.627694], {
            hintContent: 'Село Шамалган',
            balloonContent: 'ул. Примерная, д. 1'
        });

        map.geoObjects.add(placemark);
    }
});
