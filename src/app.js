const Ractive = require('ractive');

Ractive.DEBUG = (process.env.NODE_ENV === 'development');
Ractive.DEBUG_PROMISES = Ractive.DEBUG;

Ractive.defaults.enhance = true;
Ractive.defaults.lazy = true;
Ractive.defaults.sanitize = true;
Ractive.defaults.snapshot = '@global.__DATA__';

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
        footer: require('./templates/parsed/footer'),
        homepage: require('./templates/parsed/homepage'),
        notfound: require('./templates/parsed/notfound')
    },
    transitions: {
        fade: require('ractive-transitions-fade'),
    },
    components: {
        tags: require('./components/Tags'),
        articles: require('./components/Articles'),
        profile: require('./components/Profile'),
    },
    computed: {
        tags: require('./computed/tags')
    }
};

module.exports = () => new Ractive(options);