const Ractive = require('ractive');

module.exports = Ractive.extend({
	template: require('../templates/parsed/pagination'),
	attributes: {
        required: ['total'],
		optional: ['offset', 'limit']
	},
    data: () => ({
        total: 0,
        limit: 10,
        offset: 0,
        isCurrent(page) {
            let limit = parseInt(this.get('limit')),
                offset = parseInt(this.get('offset'));
            return offset === ((page * limit) - limit);
        },
        getOffset(page) {
            return (page - 1) * parseInt(this.get('limit'));
        }
    }),
    computed: {
        pages() {
            let length = Math.ceil(parseInt(this.get('total')) / parseInt(this.get('limit')));
            return Array.apply(null, { length }).map((p, i) => ++i);
        }
    }
});