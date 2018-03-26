const api = require('../services/api');

module.exports = function() {

    const type = this.get('type'),
        params = this.get('params');

    const key = 'articlesList',
        keychain = `${this.snapshot}${this.keychain()}.${key}`;

    let articles = this.get(keychain);
    if (articles) {
        this.set(keychain, null);
    } else {
        articles = api.articles.fetchAll(type, params);
        this.wait(articles, key);
    } 

    return articles;
};