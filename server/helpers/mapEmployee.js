module.exports = function (obj1, obj2) {
    if (obj2.password) obj1.password = obj2.password;
    if (obj2.email) obj1.email = obj2.email;
    if (obj2.username) obj1.username = obj2.username;
    if (obj2.tag) obj1.tag = obj2.tag;
    if (obj2.workspace_id) obj1.workspace_id = obj2.workspace_id;
    return obj1;
}