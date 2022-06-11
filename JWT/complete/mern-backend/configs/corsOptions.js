var whitelist = ["http://localhost:3000", "https://mern.vercel.app"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
module.exports = corsOptions;
