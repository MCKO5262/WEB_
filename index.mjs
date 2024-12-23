// server.mjs
import { createServer } from 'node:http';
import fs from 'node:fs';

const server = createServer((req, res) => {
    const url = req.url;

    switch (url) {
        case "/about.html":

            fs.readFile("./static/about.html", (err, data) => {

                if (err !== null) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end("<p>Error</p>");
                    return;
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            })

            break;
        case "/about.pdf":

            fs.readFile("./static/about.pdf", (err, data) => {

                if (err !== null) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end("<p>Error</p>");
                    return;
                }

                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment; filename=about.pdf',
                    'Content-Length': data.length
                });

                res.end(data);
            })

            break;
        case "/users":
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(`[
                { name: 'bat', age: 5 },
                { name: 'gerel', age: 4 } ]`);
            break;
        case "/about":
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<main><h1>About</h1></main>");
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`Hello World!\n${url.pathname}`);
            break;
    }
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000');
});

// run with `node server.mjs`
