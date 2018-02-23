const Ractive = require('ractive');

Ractive.DEBUG = (process.env.NODE_ENV === 'development');
Ractive.DEBUG_PROMISES = Ractive.DEBUG;

Ractive.defaults.enhance = true;
Ractive.defaults.lazy = true;
Ractive.defaults.sanitize = true;

const options = {
    el: '#app',
    template: `<div id="msg">Static text! + {{message}} + {{fullName}}</div>`,
    data: {
        message: 'Hello world',
        firstName: 'Habr',
        lastName: 'User'
    },
    computed: {
        fullName() {
            return this.get('firstName') + ' ' + this.get('lastName');
        }
    }
};

module.exports = () => new Ractive(options);