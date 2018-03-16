const options = {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
};

const formatter = new Intl.DateTimeFormat('en-us', options);

module.exports = function (val) {
    return formatter.format(new Date(val));
};