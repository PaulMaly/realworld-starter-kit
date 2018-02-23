const express = require('express'),
	helmet = require('helmet'),
	compress = require('compression'),
	serve = require('serve-static'),
	cons = require('consolidate'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

const app = require('./middleware/app'),
	api = require('./middleware/api'),
	req = require('./middleware/req'),
	err = require('./middleware/err');

const config = require('./config/common');

const server = express();

server.enable('trust proxy');

server.engine('html', cons.mustache);
server.set('view engine', 'html');

server.use(helmet());
server.use(session(config.session));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(methodOverride('_method'));

server.use(compress({ threshold: 0 }));
server.use(serve('dist'));

server.use(req());

server.all('/api/*', api());

server.use(app());
server.use(err());

server.listen(config.port);