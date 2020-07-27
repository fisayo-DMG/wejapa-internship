const http = require("http");
const { parse } = require("querystring");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(
      `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
              body {
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
              }
            </style>
            <body>
              <h1>Hello World, Welcome to WeJapa Internships</h1>
              <form method="POST" action="/">
              <label>Please enter a name below: <br><br>
                  <input type="text" name='name'> <br><br>
                  <input type="submit">
                  </label>
              </form>
            </body>
            </html>
            `
    );
  }

  if (req.url === "/" && req.method === "POST") {
    let body = "";
    req.on("data", (content) => {
      body += content.toString();
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "text/html" });
      const bodyMessage = parse(body);
      console.log(bodyMessage)
      res.end(`<center><h1>Hello ${parse(body).name}, Welcome to WeJapa Internships<h1></center>`);
    });
  } else {
    res.statusCode = 404;
    res.end("Error");
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
