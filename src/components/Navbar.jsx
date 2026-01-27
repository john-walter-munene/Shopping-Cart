import PropTypes from "prop-types";
// import { Link } from "react-router";
import { Link } from "react-router-dom";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Cart", path: "/cart" },
];

function NavigationButton({ label, path }) {
    return (<Link to={path} className="navigation-button" data-testid={label}>{label}</Link>);
}

NavigationButton.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
};

function NavBar({ navigationLinks = navLinks, displayCartItemsCount=false, cartItemsCount }) {

    
    return (
        <div className="application-header">
            <ApplicationHead />

            <nav className="navigation-bar" role="navigation">
                {navigationLinks.map(link => (
                    <NavigationButton key={link.path} label={link.label} path={link.path} />
                ))}
            </nav>

            {displayCartItemsCount && 
                <div className="cart-items-count-display" data-testid="cart-items-count">
                    <img src="" alt="app devloper" />
                    <img src="" alt="cart-icon" />
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
        <div className="cartify-heading">
            <img src="" alt="" />
            <h1>Cartify</h1>
        </div>
    );
}

export { NavBar };