module.exports = function (obj1, obj2) {
    if (obj2.name) obj1.name = obj2.name;
    return obj1;
}