import PropTypes from "prop-types";
import { Link } from "react-router";

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'Cart', path: '/cart' },
];

function NavigationButton({ label, path }) {
  return (
    <Link to={path} className="navigation-button">{label}</Link>
  );
}

NavigationButton.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

function NavBar({ navgationLinks = navLinks }) {
  return (
    <div className="application-header">
      <ApplicationHead />

      <nav className="navigation-bar">
        {navgationLinks.map(link => (
          <NavigationButton key={link.path} label={link.label} path={link.path}/>))}
      </nav>
    </div>
  );
}

NavBar.propTypes = {
  navgationLinks: PropTypes.array,
};

function ApplicationHead() {
  return (
    <div className="cinestack-heading">
      <img src="" alt="" />
      <h1>Cine Stack</h1>
    </div>
  );
}

export { NavBar };