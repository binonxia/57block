
const url = require('node:url')
const {parseTime, unixtime} = require('./timeController')
const HOST = "localhost";
const PORT = 8080;
const route = (req, res) => {
    const params = new url.URL(`http://${HOST}:${PORT}` + req.url);
    switch (params.pathname) {
        case '/parsetime':
            parseTime(params, res)
            break;

        case '/unixtime':
            unixtime(params, res)
            break;

        default:
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end('route not exist')
            console.log(params.pathname,'route not exist' )
            break;
    }
}

module.exports = {
    route
 }