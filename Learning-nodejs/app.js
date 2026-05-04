const http = require("http");
const fs = require("fs");

function rqlistener(req, res) {
  //   console.log(req.url, req.method, req.headers);
  console.log("server running on port 3000");
  //   process.exit //exits the event loop after executing 1 task

  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter your message</title></heade>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>',
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("Message.txt", message);
      //   console.log(parsedBody);
    });
    req.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></heade>");
  res.write("<body><h1>Hello this is my nodejs server</h1></body>");
  res.write("</html>");
  res.end();
}

const server = http.createServer(rqlistener);

server.listen(3000);
