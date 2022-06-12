const User = require("./../model/db");

async function handleSearch(req, res) {
  const search = {
    username: req.body.searchData
  };
  var users = await User.find({});
  users = users.filter(
    (user) => search.username?.length && user.username.includes(search.username)
  );
  users = users.sort((a, b) => {
    a = a.username;
    b = b.username;
    return 1 ? a.startsWith(search.username) : -1;
  });
  res.send(users);
}
module.exports = handleSearch;
