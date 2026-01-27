import PropTypes from "prop-types";

import { countItemsRecursive } from "../utils";
import { countPriceRecursive } from "../utils";
import { formatNumber } from "../utils";
import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

function ShoppingCart({ cart, setCart }) {

    let numberOfItemsInCart = countItemsRecursive(cart);

    if (numberOfItemsInCart === 0) return <ShoppingCartWrapper content={<EmptyCart />} cartItemsCount={numberOfItemsInCart} />;
    return <ShoppingCartWrapper content={<CartItems cart={cart} setCart={setCart} />} cartItemsCount={numberOfItemsInCart} />;
};

function ShoppingCartWrapper({ content, cartItemsCount }) {
    return (
        <div className="cart-page" role="main">
            <NavBar displayCartItemsCount={true} cartItemsCount={cartItemsCount} />
            {content}
            <Footer />
        </div>
    );
}

function CartItems({ cart, setCart }) {

    // Remove a product category from the cart
    const handleProductCategoryRemoval = (id) => {
        let copyOfCartItems = [...cart];        
        let nextCartItems = copyOfCartItems.filter((item) => item.id !== id);
        setCart(nextCartItems);
    };

    // Increase quantity of a product in the cart
    const handleItemsIncreaseInProductCategory = (id) => {
        let copyOfCartItems = [...cart];
        let nextCartItems = copyOfCartItems.map(item => {
            if (item.id === id) return { ...item, quantity: item.quantity + 1 };
            return item;
        });

        setCart(nextCartItems);
    };

     // Decrease quantity of a product in the cart
    const handleItemsDecreaseInProductCategory = (id) => {
        let copyOfCartItems = [...cart];
        let nextCartItems = copyOfCartItems.map(item => {
            if (item.id === id && item.quantity > 0) return { ...item, quantity: item.quantity - 1 };
            return item;
        }).filter(item => item.quantity > 0); // remove items if quantity hits 0

        setCart(nextCartItems);
    };

    let copyOfCartItems = [...cart];
    let cartItems = copyOfCartItems.map((cartItem) => 
        (<CartItem item={cartItem} key={cartItem.id} removeItemCategory={handleProductCategoryRemoval} 
            increaseItems={handleItemsIncreaseInProductCategory} decreaseItems={handleItemsDecreaseInProductCategory} />));

    let totalPriceOfItems = formatNumber(countPriceRecursive(copyOfCartItems));

    return (
        <div className="cart-items">
            <h2>Your Cart</h2> 
            {cartItems}
            <h3>Total Items {countItemsRecursive(copyOfCartItems)}</h3>
            <h3 data-testid="total-price">Total Price {totalPriceOfItems}</h3>
        </div>
    );
}

function CartItem({ item, removeItemCategory, increaseItems, decreaseItems  }) {
    const { id, title, quantity, price, image } = item;
    let totalPrice = formatNumber(quantity * price);

    return (
        <div className="cart-item">
            <img src={image} alt={title} />

            <div className="cart-item-details">
                <h3>{title}</h3>
                <p>Quantity: {quantity}</p>
                <p>price: {totalPrice}</p>
                <div className="cart-item-action">
                    <button onClick={() => removeItemCategory(id)} >Remove</button>
                    <button onClick={() => decreaseItems(id)} >-</button>
                    <button onClick={() => increaseItems(id)} >+</button> 
                </div>
            </div>
        </div>
    );
}

function EmptyCart() {
    return (
        <div className="empty-cart">
            <p>Your Cart is empty. Please add some items</p>
        </div>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
};

ShoppingCartWrapper.propTypes = {
    content: PropTypes.element.isRequired,
    cartItemsCount: PropTypes.number.isRequired,
};

CartItems.propTypes = {
    cart: PropTypes.array.isRequired,
    setCart: PropTypes.func.isRequired,
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    removeItemCategory: PropTypes.func.isRequired,
    increaseItems: PropTypes.func.isRequired,
    decreaseItems: PropTypes.func.isRequired,
};

export { ShoppingCart };