import { NavBar } from "./NavBar";
import { Footer } from "./Footer";
import styles from "../assets/styles/Error.module.css";

function ErrorPage() {
    return (
        <div >
            <NavBar />
            <div className={styles["error-page-text"]}>
                <p>Ooops! This page does not exist</p>
            </div>
            <Footer />
        </div>
    );
}

export { ErrorPage };