// import surveyApi from './survey-api.js';
import productsApi from '../products-api.js';
import surveyApi from '../survey-api.js';
import ProductDisplay from './ProductDisplay.js';
import html from '../html.js';


function makeTemplate() {
    return html`
    <header>
        <h1>Busmall Products Survey</h1>
        <p>Please pick one image from each group of 3 that you would be most likely to purchase.</p>
    </header>
    <body>
        <section class="products"></section>
    </body>
    `;
}

class BusmallApp {
    constructor() {
        this.products = productsApi.getAll();
        this.totalRounds = 0;
    }
    
    render() {
        const dom = makeTemplate();
        this.list = dom.querySelector('section');

        const productDisplay = new ProductDisplay(this.products, product => {
            this.totalRounds++;
            product.clicks++;
            surveyApi.add(product);
            console.log(product);
        }, product => {
            product.views++;
        });

        if(this.totalRounds === 25) {
            //redirect to new html page
        }

        this.list.appendChild(productDisplay.render());
        return dom;
    }
}

const busmallApp = new BusmallApp();

document.getElementById('root').appendChild(busmallApp.render());