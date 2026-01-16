import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

function ShoppingPage() {
    return (
        <div className="shop-page">
            {<NavBar />}
            {<h1>In the shopping page</h1>}
            {<Footer />}
        </div>
    );
}

export { ShoppingPage };