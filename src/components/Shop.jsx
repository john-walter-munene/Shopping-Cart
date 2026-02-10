import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "../assets/styles/Shop.module.css";
import { formatNumber, countItemsRecursive, trimByWords } from "./utils";
import { NavBar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";

function ShoppingPage({ products, setProducts, cart, setCart }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Populate the shop with products.
    useEffect(() => {
        let ignore = false;
        typeof ignore // supress linter error shouts!

        async function fetchCartifyProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

                if (!ignore) {
                    setProducts(data);
                    setLoading(false);
                }
            } catch (error) {
                if ( error && !ignore) {
                    console.log(error);
                    setError(true);
                    setLoading(false);
                }
            }    
        }

        fetchCartifyProducts();

        return () => { ignore = true };
    },[setProducts]);

    let numberOfItemsInCart = countItemsRecursive(cart);
    const productsOnDisplay = products.map((product) => (<ProductCard product={product} key={product.id} cart={cart} setCart={setCart} />));
    
    // Handle error and loading states
    if (loading) return (<ShoppingPageWrapper content={<LoadingProducts />} cartItemsCount={numberOfItemsInCart} />);
    if (error) return (<ShoppingPageWrapper content={<ErrorHandler />} cartItemsCount={numberOfItemsInCart} />);

    // Handle explicit return of the products
    return (<ShoppingPageWrapper content={productsOnDisplay} cartItemsCount={numberOfItemsInCart} />);
}

function ShoppingPageWrapper({ content, cartItemsCount }) {
    return (
         <div className="shop-page" role="main">
            <NavBar displayCartItemsCount={true} cartItemsCount={cartItemsCount}  />
            <div className={styles["products-in-shop"]}>{content}</div>
            <Footer />
        </div>
    );
}

function LoadingProducts() {
    return (
        <div className={styles["loading-products"]} data-testid="loading-products" >
            <p>Hang on, loading shop products</p>
            <div className={styles["spinner"]}></div>
        </div>
    );
}

function ErrorHandler() {
    return (
        <div className={styles["products-load-error"]} data-testid="products-load-error" >
            <p>Application error, we are working to resolve it. In the meantime, please try refreshing the page...👨‍💻</p>
        </div>
    );
}

function ProductCard({ product, cart, setCart }) {
    const [quantity, setQuantity] = useState(0);

    const { image, title, description, price, id } = product;

    // Explicit final price.
    const finalPrice = formatNumber(quantity * price);

    const handleQuantityChange = (event) => {
        let value = event.target.value;
        if (value === "" || /^[0-9]*$/.test(value)) {
            if (Number(value) > 999) value = "999";
            setQuantity(value);
        }
    }

    const handleBlur = () => {
        let num = Number(quantity);

        if (quantity === "" || num < 0) setQuantity("0");
        else if (num > 999) setQuantity("999");
    };

    const handleAddToCart = () => {
        const numQuantity = Number(quantity);
        if (numQuantity === 0) {
            alert(`Please select a quantity for ${title}`);
            return;
        }

        let cartItem = { id, title, quantity: numQuantity, price, image };
        let nextCart = [...cart];

        // Check if the product already exists in the cart
        const existingIndex = nextCart.findIndex(item => item.id === id); 

        if (existingIndex !== -1) {
            // Update the quantity of the existing product
            const existingItem = nextCart[existingIndex];
            const updatedItem = { ...existingItem, quantity: existingItem.quantity + numQuantity };
            nextCart[existingIndex] = updatedItem;
        } else {
            nextCart.push(cartItem);
        }

        setCart(nextCart);
        setQuantity(0);
    }

    return (
        <div className={styles["product-card"]} data-testid={`product-${product.id}`}>
            <img src={image} alt={title} />
            <div className={styles["product-details"]}>
                <h3>{title}</h3>
                <p>{trimByWords(description)}</p>
                <p>${price}</p>
            </div>

            <div className={styles["product-quantity"]}>
                <label htmlFor={`quantity-${id}`}><p>Quantity:</p></label>
                <input type="number" id={`quantity-${id}`} value={quantity} min={0} max={999}
                    onChange={(event) => handleQuantityChange(event)} onBlur={handleBlur} />
            </div>
            <div className={styles["product-price"]}> Final Price ${finalPrice}</div>
            <button className={styles["add-to-cart"]} onClick={handleAddToCart}>Add to cart</button>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
};

ShoppingPage.propTypes = {
    products: PropTypes.array.isRequired,
    setProducts: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
};

ShoppingPageWrapper.propTypes = {
    content: PropTypes.element.isRequired,
    cartItemsCount: PropTypes.number,
};

export { ShoppingPage };