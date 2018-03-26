const Ractive = require('ractive');

module.exports = Ractive.extend({
	template: require('../templates/parsed/profile'),
	components: {
		articles: require('./Articles')
	},
	computed: {
		profile: require('../computed/profile')
	},
	attributes: {
		required: ['username'],
		optional: ['section']
	},
	data: () => ({
		username: '',
		section: ''
	})
});