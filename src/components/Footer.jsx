import styles from "../assets/styles/Footer.module.css";
import cartifyIcon from '/src/assets/icons/Cart.png';

function Footer() {
    return (
        <div className={styles["cartify-footer"]} data-testid="cartify-footer" >
            <div className={styles["company-footer-desc"]}>
                <h3>{<img src={cartifyIcon} alt="Cartify-Icon" />} Cartify</h3>
                <p>A modern digital shop for smarter online purchases.</p>
                <p>Shop with us and enjoy a new online experience with discounts.</p>
            </div>

            <div className={styles["services-listed"]}>
                <h3>Shop</h3>
                <ul>
                    <li>Browse products</li>
                    <li>View cart</li>
                    <li>Checkout</li>
                </ul>
            </div>

            <div className={styles["about-cartify"]}>
                <h3>Company</h3>
                <ul>
                    <li>About</li>
                    <li>Journal</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className={styles["stay-updated"]}>
                <h3>Newsletter</h3>
                <p>Get occasional updates on products, deals, and shopping tips.</p>

                <div className={styles["data-form"]}>
                    <form action="">
                        <input type="text" id="email"/>
                        <label htmlFor="email"><p>Email</p></label>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { Footer };