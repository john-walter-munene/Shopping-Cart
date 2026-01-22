function Footer() {
    return (
        <div className="cartify-footer">
            <div className="company-footer-desc">
                <h3>Cartify</h3>
                <p>A modern digital shop for smarter online purchases.</p>
            </div>

            <div className="services-listed">
                <h3>Shop</h3>
                <ul>
                    <li>Browse products</li>
                    <li>View cart</li>
                    <li>Checkout</li>
                </ul>
            </div>

            <div className="about-cartify">
                <h3>Company</h3>
                <ul>
                    <li>About</li>
                    <li>Journal</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="stay-updated">
                <h3>Newsletter</h3>
                <p>Get occasional updates on products, deals, and shopping tips.</p>

                <div className="data-form">
                    <form action="">
                        <input type="text" />
                        <label htmlFor=""><p>Email</p></label>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { Footer };