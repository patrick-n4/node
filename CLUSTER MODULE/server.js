const http = require("http");
const PORT = 8080;

let startTime = performance.now();
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    for (let i = 1; i <= 1000000; i++) {
      res.write(`<h1>${i}</h1>`);
    }
    res.end();
  })
  .listen(8080, () => {
    console.log(`Server running on localhost:${PORT}`);
  });
let endTime = performance.now();
console.log(`Time Elapsed for the server to start is: ${endTime - startTime}`);
