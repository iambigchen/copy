const http = require('http')
const fs = require('fs')
const url = require('url')

let val = ''

const app = http.createServer((req, response) => {
    const myUrl = url.parse(req.url)
    console.log(`-----123----`, myUrl)
    if (myUrl.pathname === '/') {
        fs.readFile('index.html', (error, data) => {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('500 - Internal Server Error');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (myUrl.pathname === '/copy') {
        val = myUrl.query.replace('val=', '')
        response.end('success')
    } else if (myUrl.pathname === '/get') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(val))
    }
})



app.listen(8085, () => {
    console.log('server is running on port 8085')
})