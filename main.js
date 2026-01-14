const products = [
    {
        id: 1,
        name: "Golden Cavendish",
        description: "The world's most popular banana, perfectly sweet and creamy.",
        price: 50.00,
        image: "public/images/cavendish.png"
    },
    {
        id: 2,
        name: "Exotic Red Dacca",
        description: "Rare deep red skin with a hint of raspberry sweetness.",
        price: 50.00,
        image: "public/images/red.png"
    },
    {
        id: 3,
        name: "Baby Lady Finger",
        description: "Tiny, exceptionally sweet, and perfect for snacking.",
        price: 50.00,
        image: "public/images/baby.png"
    },
    {
        id: 4,
        name: "Blue Java (Ice Cream)",
        description: "Silky texture with a flavour reminiscent of vanilla custard.",
        price: 50.00,
        image: "public/images/hero.png" // Placeholder or similar
    }
];

let cartCount = 0;

function init() {
    renderProducts();
    setupCart();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="price">₹${product.price.toFixed(2)} </span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.addToCart = function (id) {
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    showToast();
};

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

function setupCart() {
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', () => {
        alert(`You have ${cartCount} items in your cart! Total: ₹${(cartCount * 8.5).toFixed(2)} (estimated)`);
    });
}

// Reveal animations on scroll
const reveal = () => {
    const reveals = document.querySelectorAll('.product-card, .about-text, .stat');
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.product-card, .about-text, .stat');
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    init();
    window.addEventListener('scroll', reveal);
    reveal(); // Check on load
});
