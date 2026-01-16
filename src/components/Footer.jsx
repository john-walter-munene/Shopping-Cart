function Footer() {
    return (
        <div className="cinestack-footer">
            <div className="company-footer-desc">
                <h3>CineStack</h3>
                <p>A modern hub for discovering and enjoying movies.</p>
            </div>

            <div className="services-listed">
                <h3>Services</h3>
                <ul>
                    <li>Start watching</li>
                    <li>Browse movies</li>
                    <li>My List</li>
                </ul>
            </div>

            <div className="about-cinestack">
                <h3>Company</h3>
                <ul>
                    <li>About</li>
                    <li>Jornal</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="stay-updated">
                <h3>Newsletter</h3>
                <p>Get occasional insights on movies, curation, and recommendations.</p>
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