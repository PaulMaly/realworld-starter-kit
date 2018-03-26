const Ractive = require('ractive');

module.exports = Ractive.extend({
	template: require('../templates/parsed/tags'),
	attributes: {
		required: ['tags'],
		optional: ['skin']
	},
	data: () => ({
		tags: [],
		skin: 'outline'
	})
});