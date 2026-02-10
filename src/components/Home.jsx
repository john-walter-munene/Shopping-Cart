// Dev tools
import PropTypes from "prop-types";

// Components and styles
import { NavBar } from "./Navbar.jsx";
import { Footer } from "./Footer.jsx";
import styles from "../assets/styles/Home.module.css";

// Page assets
import curatedProducts from '/src/assets/icons/curated-products.png';
import smartCart from '/src/assets/icons/smart-cart.png';
import trustedRecommendations from '/src/assets/icons/trusted-recommendations.png';
import fastCheckout from '/src/assets/icons/fast-checkout.png';

import resultExpectations from '/src/assets/icons/expectations.png';
import fasterDecisions from '/src/assets/icons/faster-decisions.png';
import moreConfidence from '/src/assets/icons/more-confidence.png';
import stayOrganized from '/src/assets/icons/stay-organized.png';
import emptyCarts from '/src/assets/icons/empty-carts.png';
import enjoyShoppingAgain from '/src/assets/icons/enjoy-shopping.png';

import traditionalStores from '/src/assets/icons/traditional-store.png';
import theCartifyWay from '/src/assets/icons/cartify-way.png';

function CartifyIntro() {
    return (
        <div className={styles["shop-intro"]}>
            <p>Discover, compare, and buy digital products with confidence. Welcome.</p>

            <h1>Products that are actually worth buying</h1>

            <p>
                Cartify helps you find quality products, manage your cart,
                and checkout without friction — so you spend less time browsing
                and more time buying what matters.
            </p>

            <button>Explore the shop →</button>
        </div>
    );
}

function ShoppingStats() {
    return (
        <div className={styles["shopping-stats"]}>
            <h2>What are the numbers saying? 💁‍♂️</h2>

            <div className={styles["stats-house"]}>
                <div className={styles["stat-card"]}>
                    <p>58%</p>
                    <p>of shoppers abandon carts due to decision overload</p>
                </div>

                <div className={styles["stat-card"]}>
                    <p>72%</p>
                    <p>say it’s hard to trust product quality online</p>
                </div>

                <div className={styles["stat-card"]}>
                    <p>4+ stores</p>
                    <p>visited before committing to one purchase</p>
                </div>
            </div>
        </div>
    );
}

const cartifyProductDescriptionCards = [
    {
        problem: "There are too many products, but nothing feels right",
        description: "Large marketplaces overwhelm buyers and bury quality products under noise.",
    },
    {
        problem: "I lose products I was interested in",
        description: "You compare items, close tabs, and forget what actually mattered.",
    },
    {
        problem: "I don’t know if a product is actually good",
        description: "Reviews are unreliable, ratings are inflated, and trust is unclear.",
    },
    {
        problem: "I abandon my cart halfway",
        description: "Too many decisions, unclear value, or a frustrating checkout flow.",
    },
    {
        problem: "Recommendations don’t fit my needs",
        description: "Most stores push trends, not what you’re actually shopping for.",
    },
];

function ProductDescription({ productDescriptionCards }) {
    let copyOfProductDescriptionCards = [...productDescriptionCards];

    let productCards = [];

    copyOfProductDescriptionCards.forEach(productCard => {
        productCards.push(<ProductDescriptionCard productCard={productCard} />);
    });

    return (
        <div className={styles["cartify-product-desc"]}>
            <p>
                You open an online store, scroll endlessly, compare options,
                and still feel unsure. Here’s what shoppers tell us all the time:
            </p>
            <div className={styles["cartify-description-cards"]}>{productCards}</div>
        </div>
    );
}

ProductDescription.propTypes = {
    productDescriptionCards: PropTypes.array.isRequired,
};

function ProductDescriptionCard({ productCard }) {
    return (
        <div className={styles["home-product-card"]}>
            <h3>{productCard.problem}</h3>
            <p>{productCard.description}</p>
        </div>
    );
}

ProductDescriptionCard.propTypes = {
    productCard: PropTypes.object,
};

function CartifyDescription() {
    return (
        <div className={styles["cartify-description"]}>
            {<ShoppingStats />}
            {<ProductDescription productDescriptionCards={cartifyProductDescriptionCards} />}
        </div>
    );
}

const cartifyServices = [
    {   
        icon: curatedProducts,
        service: "Curated products",
        description: "Browse high-quality digital products selected for real value.",
        action: "Browse products →",
    },
    {   
        icon: smartCart,
        service: "Smart cart",
        description: "Save items, compare options, and return to decisions anytime.",
        action: "View cart →",
    },
    {   
        icon: trustedRecommendations,
        service: "Trusted recommendations",
        description: "Suggestions based on intent and behavior, not popularity.",
        action: "See suggestions →",
    },
    {   
        icon: fastCheckout,
        service: "Fast checkout",
        description: "A clean, frictionless checkout experience across devices.",
        action: "Checkout →",
    },
];

function CartifyServiceCard({ serviceCard }) {
    return (
        <div className={styles["cartify-service-card"]}>
            <img src={serviceCard.icon} alt={serviceCard.service} />
            <p>{serviceCard.service}</p>
            <p>{serviceCard.description}</p>
            <button>{serviceCard.action}</button>
        </div>
    );
}

CartifyServiceCard.propTypes = {
    serviceCard: PropTypes.object.isRequired,
};

function CartifyServices({ services }) {
    let copyOfServices = services.slice();

    let servicesCards = [];

    for (let service of copyOfServices) {
        servicesCards.push(<CartifyServiceCard serviceCard={service} />);
    }

    return (
        <div className={styles["cartify-services"]}>
            <p>SERVICES</p>
            <h2>What we offer</h2>
            <p>A better way to shop online. It's time to have your sleek digital shooping experience.</p>
            <div className={styles["cartify-service-cards"]}>{servicesCards}</div>
        </div>
    );
}

CartifyServices.propTypes = {
    services: PropTypes.array.isRequired,
};

const cartifyResults = [
    {
        result: "Faster decisions",
        description: "Find the right product without overthinking",
        icon: fasterDecisions,
    },
    {
        result: "More confidence",
        description: "Understand what you’re buying before checkout",
        icon: moreConfidence,
    },
    {
        result: "Stay organized",
        description: "All saved items and carts in one place",
        icon: stayOrganized,
    },
    {
        result: "Fewer abandoned carts",
        description: "Clear value and smooth checkout flow",
        icon: emptyCarts,
    },
    {
        result: "Enjoy shopping again",
        description: "Focus on buying, not doubting",
        icon: enjoyShoppingAgain,
    },
];

function CartifyExpectationCard({ resultCard }) {
    return (
        <div className={styles["cartify-result-card"]}>
            <img src={resultCard.icon} alt={resultCard.result} />
            <h3>{resultCard.result}</h3>
            <p>{resultCard.description}</p>
        </div>
    );
}

CartifyExpectationCard.propTypes = {
    resultCard: PropTypes.object.isRequired,
};

function CartifyExpectations({ results }) {
    let copyOfResults = [...results];

    let resultCards = copyOfResults.map(resultCard => (<CartifyExpectationCard resultCard={resultCard} />));

    return (
        <div className={styles["results"]}>
            <p>Results</p>
            <h2>What you can Expect <img src={resultExpectations} alt="expectations"/> </h2>
            <p>A shopping experience designed around you.</p>
            <div className={styles["cartify-results-cards"]}>{resultCards}</div>
        </div>
    );
}

CartifyExpectations.propTypes = {
    results: PropTypes.array.isRequired,
};

const cartifyChoiceReasons = [
    {
        icon: traditionalStores,
        option: "Traditional stores",
        bias: ["Overwhelming catalogs", "Pushy upsells", "Unclear product value", "Friction-heavy checkout",],
    },
    {
        icon: theCartifyWay,
        option: "The Cartify Way",
        bias: ["Curated product selection", "Clear comparisons", "Saved carts & intent tracking", "Clean, focused checkout",],
    },
];

function WhyCartify({ reasons }) {
    let copyOfReasons = reasons.slice();

    let reasonsCards = copyOfReasons.map(reason => {
        let symbol = (reason.option === "Traditional stores") ? "✗" : "✓";
        let symbolClassName = (reason.option === "Traditional stores") ? 'traditional-store' : 'the-cartify-way';

        return (
            <div className={styles["reason-card"]}>
                <div className={styles["title"]}>
                    <img src={reason.icon} alt={reason.option} />
                    <p>{reason.option}</p>
                </div>
                
                <ul>{reason.bias.map(text => (
                    <li> 
                        {<span className={styles[symbolClassName]} >{symbol}</span>}
                        {text}
                    </li>))}
                </ul>
            </div>
        );
    });

    return (
        <div className={styles["why-cartify"]}>
            <p>WHY CARTIFY?</p>
            <h2>Not just another online store</h2>
            <p>
                Most stores optimize for volume and impulse. Cartify focuses on
                clarity, intent, and confidence — helping you make better
                purchase decisions.
            </p>
            <div className={styles["cartify-choice"]}>{reasonsCards}</div>
        </div>
    );
}

WhyCartify.propTypes = {
    reasons: PropTypes.array.isRequired,
};

function CartifyNextSteps() {
    return (
        <div className={styles["cartify-next-steps"]}>
            <h2>Ready to shop smarter?</h2>
            <p>Stop browsing. Start buying with confidence.</p>

            <div className={styles["quick-next-steps"]}>
                <button>Browse products</button>
                <button>View cart</button>
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className={styles["home-page"]} role="main">
            {<NavBar />}
            {<CartifyIntro />}
            {<CartifyDescription />}
            {<CartifyServices services={cartifyServices} />}
            {<CartifyExpectations results={cartifyResults} />}
            {<WhyCartify reasons={cartifyChoiceReasons} />}
            {<CartifyNextSteps />}
            {<Footer />}
        </div>
    );
}

export { Home };