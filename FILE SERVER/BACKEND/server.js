const http = require("http");
const fs = require("fs");
const url = require("url");
const PORT = 6060;

http
  .createServer((req, res) => {
    let fileObject = url.parse(req.url, true);
    let fileName = `./../FRONTEND/${fileObject.pathname}`;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        fs.readFile("./../FRONTEND/404.html", (err, data) => {
          if (err) {
            throw err;
          } else {
            res.writeHead(404, {
              "Content-Type": "text/html",
            });
            res.write(data);
            res.end();
          }
        });
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html",
        });
        res.write(data);
        res.end;
      }
    });
  })
  .listen(PORT, () => {
    console.log(`Server is running at localhost:${PORT}`);
  });
