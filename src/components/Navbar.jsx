import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "../assets/styles/Navbar.module.css";

import cartifyIcon from '/src/assets/icons/Cart.png';
import photoOfJohnWalter from '/src/assets/images/John Walter.jpeg';

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Cart", path: "/cart" },
];

function NavigationButton({ label, path }) {
    return (<Link to={path} className={styles["navigation-button"]} data-testid={label}>{label}</Link>);
}

NavigationButton.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

function NavBar({ navigationLinks = navLinks, displayCartItemsCount=false, cartItemsCount }) {

    
    return (
        <div className={styles["application-header"]}>
            <ApplicationHead />

            <nav className={styles["navigation-bar"]} role="navigation">
                {navigationLinks.map(link => (
                    <NavigationButton key={link.path} label={link.label} path={link.path} />
                ))}
            </nav>

            {displayCartItemsCount && 
                <div className={styles["cart-items-count-display"]} data-testid="cart-items-count">
                    <img src={photoOfJohnWalter} alt="app devloper" />
                    <img src={cartifyIcon} alt="cart-icon" />
                    <p>{cartItemsCount}</p>
                </div>}
        </div>
    );
}

NavBar.propTypes = {
    navigationLinks: PropTypes.array,
    displayCartItemsCount: PropTypes.bool,
    cartItemsCount: PropTypes.number,
};

function ApplicationHead() {
    return (
        <div className={styles["cartify-heading"]}>
            <img src={cartifyIcon} alt="Cartify Icon" />
            <h1>Cartify</h1>
        </div>
    );
}

export { NavBar };