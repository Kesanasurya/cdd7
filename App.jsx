// File moved to src/App.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
// Products are loaded from backend

function ProductCard({ product, onAdd }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-footer">
                    <span className="price">₹{product.price.toFixed(2)} </span>
                    <button className="add-btn" onClick={() => onAdd(product.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [products, setProducts] = React.useState([]);
    const [cartCount, setCartCount] = React.useState(0);
    const [showToast, setShowToast] = React.useState(false);

    React.useEffect(() => {
        fetch('http://localhost:3000/api/products')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                }
            })
            .catch((err) => console.error("Failed to load products: ", err));
    }, []);

    const addToCart = () => {
        setCartCount((c) => c + 1);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    React.useEffect(() => {
        const cartBtn = document.getElementById("cart-btn");
        if (cartBtn) {
            cartBtn.onclick = () => {
                alert(`You have ${cartCount} items in your cart! Total: ₹${(cartCount * 8.5).toFixed(2)} (estimated)`);
            };
        }
    }, [cartCount]);

    return (
        <>
            <div className="product-grid" id="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAdd={addToCart} />
                ))}
            </div>
            <div id="toast" className={showToast ? "toast show" : "toast"}>Added to cart!</div>
        </>
    );
}

const root = document.getElementById("react-root");
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
