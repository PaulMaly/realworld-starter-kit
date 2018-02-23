const run = require('../src/app');

module.exports = () => (req, res, next) => {

	const app = run();
	
	const meta = { title: 'Hello world', description: '', keywords: '' },
		content = app.toHTML(),
		styles = app.toCSS();

	app.teardown();

	res.render('index', { meta, content, styles });
};