const http = require("http");
const {route,unixtime} = require('./route')

const HOST = "localhost";
const PORT = 8080;
const startServer = () => {
    const server = http.createServer((req, res) => {

        route(req, res)
      });
    server.listen(PORT, HOST, (error) => {
        if (error) {
            console.log("Something wrong: ", error);
            return;
        }
        console.log(`server is listening on http://${HOST}:${PORT} ...`);
    });
}
startServer()


