const db = require("../dbConfig.js");

module.exports = {
  all_users,
  single_user,
  add_user
};

function all_users() {
  return db("users");
}

function single_user(name) {
  return db("users")
    .where("username", name)
    .first();
}

function add_user(user) {
  return db("users").insert(user);
}
