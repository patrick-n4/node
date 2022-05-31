const http = require("http");
const fs = require("fs");
const url = require("url");
const formidable = require("formidable");
const PORT = 5050;

http
  .createServer((req, res) => {
    let filenameObject = url.parse(req.url, true);
    let filename = `./${filenameObject.pathname}`;
    if (req.url === "/uploadfile") {
      let form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        let oldpath = files.filetoupload.filepath;
        let newpath =
          "/home/patirck-ubuntu/Desktop/serverFiles/" +
          files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, (err) => {
          if (err) {
            throw err;
          } else {
            res.write("File uploaded and moved successfully ");
            res.end();
          }
        });
      });
    } else {
      fs.readFile(filename, (err, data) => {
        if (err) {
          res.writeHead(404, {
            "Content-Type": "text/html",
          });
          res.write("<h1>404 PAGE NOT FOUND</h1>");
          res.end();
        } else {
          res.writeHead(200, {
            "Content-Type": "text/html",
          });
          res.write(data);
          res.end();
        }
      });
    }
  })
  .listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
  });
