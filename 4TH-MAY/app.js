const http = require("http");

const server = http.createServer((request, response) => {
  //   console.log(request.url, request.method);
  response.write("<html>");
  response.write("<body>");
  response.write("<h1>Hello L4-SOD-A</h1>");
  response.write('<input type="text" /><button>Send</button>');
  response.write("</body>");
  response.write("</html>");
  response.end();
});

server.listen(1000);
