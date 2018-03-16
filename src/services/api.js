const axios = require('axios');
const config = require('../../config/api.json');

const source = axios.CancelToken.source();

const api = axios.create({
    baseURL: config.baseURL,
    timeout: config.timeout,
    maxRedirects: config.maxRedirects,
    withCredentials: config.withCredentials,
    responseType: config.responseType,
    cancelToken: source.token
});

const resolve = res => JSON.parse(JSON.stringify(res.data).replace(/(&nbsp;|<([^>]+)>)/ig, ''));
const reject = err => {
    throw (err.response && err.response.data && err.response.data.errors) || {message: [err.message]};
};

const auth = {
    current: () => api.get(`/user`).then(resolve).catch(reject),
    logout: () => api.delete(`/users/logout`).then(resolve).catch(reject),
    login: (email, password) => api.post(`/users/login`, { user: { email, password } }).then(resolve).catch(reject),
    register: (username, email, password) => api.post(`/users`, { user: { username, email, password } }).then(resolve).catch(reject),
    save: user => api.put(`/user`, { user }).then(resolve).catch(reject)
};

const tags = {
    fetchAll: () => api.get('/tags').then(resolve).catch(reject)
};

const articles = {
    fetchAll: (type, params) => api.get(`/articles/${type || ''}`, { params }).then(resolve).catch(reject),
    fetch: slug => api.get(`/articles/${slug}`).then(resolve).catch(reject),
    create: article => api.post(`/articles`, { article }).then(resolve).catch(reject),
    update: article => api.put(`/articles/${article.slug}`, { article }).then(resolve).catch(reject),
    delete: slug => api.delete(`/articles/${slug}`).catch(reject)
};

const comments = {
    fetchAll: slug => api.get(`/articles/${slug}/comments`).then(resolve).catch(reject),
    create: (slug, comment) => api.post(`/articles/${slug}/comments`, { comment }).then(resolve).catch(reject),
    delete: (slug, commentId) => api.delete(`/articles/${slug}/comments/${commentId}`).catch(reject)
};

const favorites = {
    add: slug => api.post(`/articles/${slug}/favorite`).then(resolve).catch(reject),
    remove: slug => api.delete(`/articles/${slug}/favorite`).then(resolve).catch(reject)
};

const profiles = {
    fetch: username => api.get(`/profiles/${username}`).then(resolve).catch(reject),
    follow: username => api.post(`/profiles/${username}/follow`).then(resolve).catch(reject),
    unfollow: username => api.delete(`/profiles/${username}/follow`).then(resolve).catch(reject),
};

const cancel = msg => source.cancel(msg);

const request = api.request;

module.exports = {
    auth,
    tags,
    articles,
    comments,
    favorites,
    profiles,
    cancel,
    request
};