import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

function ShoppingCart() {
    return (
        <div className="shop-page">
            {<NavBar />}
            {<h1>In the cart checkout page</h1>}
            {<Footer />}
        </div>
    );
}

export { ShoppingCart };