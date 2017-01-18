function capitalize(str) {
    var f = str[0].toUpperCase();
    var rest = str.slice(1).toLowerCase();
    return f + rest;
}

module.exports = capitalize;