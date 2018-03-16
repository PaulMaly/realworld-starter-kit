const Ractive = require('ractive');

Ractive.DEBUG = (process.env.NODE_ENV === 'development');
Ractive.DEBUG_PROMISES = Ractive.DEBUG;

Ractive.defaults.enhance = true;
Ractive.defaults.lazy = true;
Ractive.defaults.sanitize = true;

Ractive.defaults.data.formatDate = require('./helpers/formatDate');
Ractive.defaults.data.errors = null;

Ractive.partials.errors = require('./templates/parsed/errors');

Ractive.use(require('ractive-ready')());
Ractive.use(require('ractive-page')({
    meta: require('../config/meta.json')
}));

const api = require('./services/api');

const options = {
    el: '#app',
    template: require('./templates/parsed/app'),
    partials: {
        navbar: require('./templates/parsed/navbar'),
        footer: require('./templates/parsed/footer')
    },
    transitions: {
        fade: require('ractive-transitions-fade'),
    },
    data: {
        message: 'Hello world',
        firstName: 'Habr',
        lastName: 'User',
        articles: []
    },
    computed: {
        fullName() {
            return this.get('firstName') + ' ' + this.get('lastName');
        }
    },
    oninit () {

        const key = 'articlesList';
        
        let articles = this.get(`@global.__DATA__.${key}`);
        
        if ( ! articles ) {
            articles = api.articles.fetchAll();
            this.wait(articles, key);
        }

        this.set('articles', articles);
    }
};

module.exports = () => new Ractive(options);