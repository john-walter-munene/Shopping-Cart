import PropTypes from "prop-types";

import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

function CartifyIntro() {
    return (
        <div className="shop-intro">
            <p>
                Discover, compare, and buy digital products with confidence.
                Built for creators, professionals, and everyday shoppers.
            </p>

            <h1>Products that are actually worth buying</h1>

            <p>
                Cartify helps you find quality products, manage your cart,
                and checkout without friction — so you spend less time browsing
                and more time buying what matters.
            </p>

            <button>Explore the shop</button>
        </div>
    );
}

function ShoppingStats() {
    return (
        <div className="shopping-stats">
            <h2>WHAT THE NUMBERS ARE SAYING</h2>

            <div className="stats-house">
                <div className="stat-card">
                    <p>58%</p>
                    <p>of shoppers abandon carts due to decision overload</p>
                </div>
                <div className="stat-card">
                    <p>72%</p>
                    <p>say it’s hard to trust product quality online</p>
                </div>
                <div className="stat-card">
                    <p>4 stores</p>
                    <p>visited before committing to one purchase</p>
                </div>
            </div>
        </div>
    );
}

const cartifyProductDescriptionCards = [
    {
        problem: "There are too many products, but nothing feels right",
        description:
            "Large marketplaces overwhelm buyers and bury quality products under noise.",
    },
    {
        problem: "I lose products I was interested in",
        description:
            "You compare items, close tabs, and forget what actually mattered.",
    },
    {
        problem: "I don’t know if a product is actually good",
        description:
            "Reviews are unreliable, ratings are inflated, and trust is unclear.",
    },
    {
        problem: "I abandon my cart halfway",
        description:
            "Too many decisions, unclear value, or a frustrating checkout flow.",
    },
    {
        problem: "Recommendations don’t fit my needs",
        description:
            "Most stores push trends, not what you’re actually shopping for.",
    },
];

function ProductDescription({ productDescriptionCards }) {
    let copyOfProductDescriptionCards = [...productDescriptionCards];

    let productCards = [];

    copyOfProductDescriptionCards.forEach(productCard => {
        productCards.push(<ProductDescriptionCard productCard={productCard} />);
    });

    return (
        <div className="cartify-product-desc">
            <p>
                You open an online store, scroll endlessly, compare options,
                and still feel unsure. Here’s what shoppers tell us all the time:
            </p>
            <div className="cartify-description-cards">{productCards}</div>
        </div>
    );
}

ProductDescription.propTypes = {
    productDescriptionCards: PropTypes.array.isRequired,
};

function ProductDescriptionCard({ productCard }) {
    return (
        <div className="home-product-card">
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
        <div className="cartify-description">
            {<ShoppingStats />}
            {<ProductDescription productDescriptionCards={cartifyProductDescriptionCards} />}
        </div>
    );
}

const cartifyServices = [
    {
        service: "Curated products",
        description:
            "Browse high-quality digital products selected for real value.",
        action: "Browse products →",
    },
    {
        service: "Smart cart",
        description:
            "Save items, compare options, and return to decisions anytime.",
        action: "View cart →",
    },
    {
        service: "Trusted recommendations",
        description:
            "Suggestions based on intent and behavior, not popularity.",
        action: "See suggestions →",
    },
    {
        service: "Fast checkout",
        description:
            "A clean, frictionless checkout experience across devices.",
        action: "Checkout →",
    },
];

function CartifyServiceCard({ serviceCard }) {
    return (
        <div className="cartify-service-card">
            <p>{serviceCard.service}</p>
            <p>{serviceCard.description}</p>
            <button className="cartify-service-card-button">{serviceCard.action}</button>
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
        servicesCards.push(
            <CartifyServiceCard serviceCard={service} />
        );
    }

    return (
        <div className="cartify-services">
            <p>SERVICES</p>
            <h2>What we offer</h2>
            <p>A better way to shop online.</p>
            <div className="cartify-service-cards">{servicesCards}</div>
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
        icon: "",
    },
    {
        result: "More confidence",
        description: "Understand what you’re buying before checkout",
        icon: "",
    },
    {
        result: "Stay organized",
        description: "All saved items and carts in one place",
        icon: "",
    },
    {
        result: "Fewer abandoned carts",
        description: "Clear value and smooth checkout flow",
        icon: "",
    },
    {
        result: "Enjoy shopping again",
        description: "Focus on buying, not doubting",
        icon: "",
    },
];

function CartifyExpectationCard({ resultCard }) {
    return (
        <div className="cartify-result-card">
            <img src={resultCard.icon} alt="" />
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
        <div className="results">
            <p>Results</p>
            <h2>What you can Expect</h2>
            <p>A shopping experience designed around you.</p>
            <div className="cartify-results-cards">{resultCards}</div>
        </div>
    );
}

CartifyExpectations.propTypes = {
    results: PropTypes.array.isRequired,
};

const cartifyChoiceReasons = [
    {
        icon: "",
        option: "Traditional stores",
        bias: [
            "Overwhelming catalogs",
            "Pushy upsells",
            "Unclear product value",
            "Friction-heavy checkout",
        ],
    },
    {
        icon: "",
        option: "The Cartify way",
        bias: [
            "Curated product selection",
            "Clear comparisons",
            "Saved carts & intent tracking",
            "Clean, focused checkout",
        ],
    },
];

function WhyCartify({ reasons }) {
    let copyOfReasons = reasons.slice();

    let reasonsCards = copyOfReasons.map(reason => {
        let symbol = reason.option === "Traditional stores" ? "✗" : "✓";

        return (
            <div className="reason-card">
                <div className="title">
                    <img src={reason.icon} alt="" />
                    <p>{reason.option}</p>
                </div>
                
                <ul>{reason.bias.map(text => (<li>{symbol} {text}</li>))}</ul>
            </div>
        );
    });

    return (
        <div className="why-cartify">
            <p>Why Cartify</p>
            <h2>Not just another online store</h2>
            <p>
                Most stores optimize for volume and impulse. Cartify focuses on
                clarity, intent, and confidence — helping you make better
                purchase decisions.
            </p>
            <div className="cartify-choice">{reasonsCards}</div>
        </div>
    );
}

WhyCartify.propTypes = {
    reasons: PropTypes.array.isRequired,
};

function CartifyNextSteps() {
    return (
        <div className="cartify-next-steps">
            <h2>Ready to shop smarter?</h2>
            <p>Stop browsing. Start buying with confidence.</p>

            <div className="quick-next-steps">
                <button>Browse products</button>
                <button>View cart</button>
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="home-page">
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