import PropTypes from "prop-types";

import { NavBar } from "../NavBar";
import { Footer } from "../Footer";

function CineStackIntro() {
    return (
        <div className="movie-hub-intro">
            <p>Discover, track, and watch movies worth your time For movie lovers, casual viewers, and cinephiles</p>

            <h1>Movies that actually matter</h1>

            <p>CineStack helps you discover great movies, keep track of what you want to watch, and spend less time 
                scrolling and more time enjoying films you’ll love.</p>

            <button>Explore tha catalog</button>
        </div>
    );
}

function  MovieStats() {
    return (
        <div className="movie-stats">
            <h2>WHAT THE NUMBERS ARE SAYING</h2>

            <div className="stats-house">
                <div className="start-card">
                    <p>40%</p>
                    <p>of viewers abandon a movie in the first 10 minutes</p>
                </div>
                <div className="start-card">
                    <p>65%</p>
                    <p>say it’s hard to find something worth watching</p>
                </div>
                <div className="start-card">
                    <p>3 platforms</p>
                    <p>to search before choosing one movie</p>
                </div>
            </div>
        </div>
    );
}

const cinestackProductDescriptionCards = [
    {
        problem: 'There’s too much, but nothing feels right',
        description: 'Endless catalogs make it harder to decide. Great movies get buried, and choice fatigue takes over.',
    },
    {
        problem: 'I forget movies I actually wanted to watch',
        description: 'Trailers, recommendations, screenshots — then it’s gone. No simple place to save and track what caught your interest.',
    },
    {
        problem: 'I never know if a movie is actually good',
        description: 'Ratings are scattered, reviews are noisy, and it’s hard to know what aligns with your taste',
    },
    {
        problem: 'I stop watching halfway through',
        description: 'You lose track of where you left off or forget why you started in the first place.',
    }, 
    {
        problem: 'Recommendations don’t get me',
        description: 'Most platforms push what’s popular, not what fits your mood or interests.',
    },
];

function ProductDescription( { productDescriptionCards }) {

    let copyOfProductDescriptionCards = [...productDescriptionCards];

    let productCards = [];

    copyOfProductDescriptionCards.forEach(productCard => {
        productCards.push(<ProductDescriptionCard productCard={productCard} />);
    })

    return (
        <div className="cinestack-product-desc">
            <p>You open a streaming app, scroll endlessly, and still feel unsure. You’ve got access to thousands of movies, 
                but finding the right one feels harder than ever. Here’s what we hear from movie fans all the time:</p>
            <div className="cinestack-description-cards">{productCards}</div>
        </div>
    );
}

ProductDescription.propTypes = {
    productDescriptionCards: PropTypes.array.isRequired,
};


function ProductDescriptionCard({ productCard }) {
    return (
         <div className="product-card">
                <h3>{productCard.problem}</h3>
                <p>{productCard.description}</p>
        </div>
    );

}

ProductDescriptionCard.propTypes = {
    productCard: PropTypes.object,
}


function CineStackDescription() {
    return (
        <div className="cinestack-description">
            {<MovieStats />}
            {<ProductDescription productDescriptionCards={cinestackProductDescriptionCards} />}
        </div>
    );
}

const cinestackServices = [
    {
        service: 'Curated discovery',
        description: 'Explore hand-picked collections, trending films, and hidden gems without endless scrolling.',
        action: 'Browse movies →',
    },
    {
        service: 'Personalized watchlists',
        description: 'Save movies, organize them by mood or genre, and never lose track of what you want to watch.',
        action: 'Build your list →',
    },
    {
        service: 'Smart recommendations',
        description: 'Get suggestions based on what you watch, what you finish, and what you skip.',
        action: 'See recommendations →',
    },
    {
        service: 'Continue watching',
        description: 'Pick up exactly where you left off, across devices, without searching.',
        action: 'Resume watching →',
    },
];

function CineStackServiceCard({ serviceCard }) {
    return (
        <div className="cinestack-service-card">
            <p>{serviceCard.service}</p>
            <p>{serviceCard.description}</p>
            <button className="cinestack-service-card-button">{serviceCard.action}</button>
        </div>
    );

}

function CineStackServices({ services }) {
    let copyOfServices = services.slice();

    let servicesCards = [];

    for (let service of copyOfServices) {
        servicesCards.push(<CineStackServiceCard serviceCard={service} />);
    }

    return (
        <div className="cinestack-services">
            <p>SERVICES</p>
            <h2>What we offer</h2>
            <p>A better way to discover and enjoy movies.</p>
            <div className="cinestack-service-cards">{servicesCards}</div>
        </div>
    );
}

CineStackServices.propTypes = {
    services: PropTypes.array.isRequired,
}

const cineStackResults = [
    {
        result: 'Less scrolling',
        description: 'Find something worth watching faster',
        icon: '',
    },
    {
        result: 'Better picks',
        description: 'Recommendations that match your taste',
        icon: '',
    },
    {
        result: 'Stay organized',
        description: 'All your movies in one place',
        icon: '',
    },
    {
        result: 'Finish more movies',
        description: 'No more forgotten half-watches',
        icon: '',
    },
    {
        result: 'Enjoy the experience',
        description: 'Focus on watching, not deciding',
        icon: '',
    },
];

function CineSackExpectationCard({ resultCard }) {
    return (
        <div className="constack-result-card">
            <img src={resultCard.icon} alt="" />
            <h3>{resultCard.result}</h3>
            <p>{resultCard.description}</p>
        </div>
    );
}

CineSackExpectationCard.propTypes = {
    resultCard: PropTypes.object.isRequired,
};

function CineStackExpectations({ results }) {
    let copyOfResults = [...results];

    let resultCards = copyOfResults.map(resultCard => (<CineSackExpectationCard resultCard={resultCard} />));

    return (
        <div className="results">
            <p>Results</p>
            <h2>What you can Expect</h2>
            <p>A movie experience designed around you.</p>
            <div className="cinestack-results-cards">{resultCards}</div>
        </div>
    );
}

CineStackExpectations.propTypes = {
    results: PropTypes.array.isRequired,
};

const cineStackChoiceReasons = [
    {   
        icon: '',
        option: 'Traditional platforms',
        bias: [
            'Endless scrolling',
            'Generic recommendations',
            'Forget where you left off',
            'No personal curation',
        ],
    },
    {   
        icon: '',
        option: 'The CineStack way',
        bias: [
            'Curated collections with context',
            'Watchlists that actually matter',
            'Progress tracking and reminders',
            'A clean, distraction-free experience',
        ]
    }
]

function CineStackAsYourChoice({ reasons }) {
    let copyOfReasons = reasons.slice();

    let reasonsCards = copyOfReasons.map(reason => {

        let symbol = reason.option === 'Traditional platforms' ? '✗' : '✓'

        return (
            <div className="reason-card">
                <div className="title">
                    <img src={reason.icon} alt="" />
                    <p>{reason.option}</p>
                </div>
                <ul>{reason.bias.map((supportText) => (<li>{symbol}{' '}{supportText}</li>))}</ul>
            </div>
        );
    })

    return (
        <div className="why-cinestack">
            <p>Why CineStack</p>
            <h2>Not just another streaming catalog</h2>
            <p>Most platforms optimize for volume and trends. CineStack focuses on discovery, clarity, and continuity — helping you build a 
                personal movie space that evolves with your taste.</p>
            <div className="cinestack-choice">{reasonsCards}</div>
        </div>
    );
}

CineStackAsYourChoice.propTypes = {
    reasons: PropTypes.array.isRequired,
};

function CineStackNextSteps() {
    return (
        <div className="cinstack-next-steps">
            <h2>Ready to enjoy movies again?</h2>
            <p>Stop scrolling. Start watching something worth your time.</p>

            <div className="quick-next-steps">
                <button>Start watching</button>
                <button>Explore CineStack</button>
            </div>
        </div>
    );
}

function Home() {
    return(
        <div className="home-page">
            {<NavBar />}
            {<CineStackIntro />}
            {<CineStackDescription />}
            {<CineStackServices services={cinestackServices} />}
            {<CineStackExpectations results={cineStackResults} />}
            {<CineStackAsYourChoice reasons={cineStackChoiceReasons} />}
            {<CineStackNextSteps />}
            {<Footer />}
        </div>
    );
}

export { Home };