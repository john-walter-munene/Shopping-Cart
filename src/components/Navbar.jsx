import PropTypes from "prop-types";
import { Link } from "react-router";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Cart", path: "/cart" },
];

function NavigationButton({ label, path }) {
    return (<Link to={path} className="navigation-button">{label}</Link>);
}

NavigationButton.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

function NavBar({ navgationLinks = navLinks, displayCartItemsCount=false, cartItemsCount }) {

    
    return (
        <div className="application-header">
            <ApplicationHead />

            <nav className="navigation-bar">
                {navgationLinks.map(link => (
                    <NavigationButton key={link.path} label={link.label} path={link.path} />
                ))}
            </nav>

            {displayCartItemsCount && 
                <div className="cart-items-count-display">
                    <img src="" alt="app devloper" />
                    <img src="" alt="cart-icon" />
                    <p>{cartItemsCount}</p>
                </div>}
        </div>
    );
}

NavBar.propTypes = {
    navgationLinks: PropTypes.array,
    displayCartItemsCount: PropTypes.bool,
    cartItemsCount: PropTypes.number,
};

function ApplicationHead() {
    return (
        <div className="cartify-heading">
            <img src="" alt="" />
            <h1>Cartify</h1>
        </div>
    );
}

export { NavBar };