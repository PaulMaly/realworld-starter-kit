const Ractive = require('ractive');

module.exports = Ractive.extend({
	template: require('../templates/parsed/articles'),
	components: {
		pagination: require('./Pagination'),
		tags: require('./Tags'),
	},
	computed: {
		articles: require('../computed/articles')
	},
	attributes: {
		optional: ['type', 'params']
	},
	data: () => ({
		type: '',
		params: null
	})
});