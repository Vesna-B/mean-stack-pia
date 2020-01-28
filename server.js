const http = require("http");
const app = require("./backend/app");
const debug = require("debug")("node-angular");     //ako bude prijavljivalo gresku prilikom pokretanja 
                                                    //(u prosirenom fajlu)

const port = process.env.PORT || 3000;       //server is listening on host port or port 3000 by default

app.set('port', port);
const server = http.createServer(app);

server.listen(port);   