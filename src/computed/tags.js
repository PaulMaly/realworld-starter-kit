const api = require('../services/api');

module.exports = function() {

    const key = 'tagsList',
        keychain = `${this.snapshot}${this.keychain()}.${key}`;

    let tags = this.get(keychain);
    if ( ! tags) {
        tags = api.tags.fetchAll().then(data => data.tags);
        this.wait(tags, key);
    }
     
    return tags;
};