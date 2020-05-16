const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    switch (req.url) {
      case '/':
        fs.readFile(
          path.join(__dirname, 'views', 'index.html'),
          'utf-8',
          (err, content) => {
            if (err) throw err;
            res.end(content);
          }
        );
        break;
      case '/greet':
        fs.readFile(
          path.join(__dirname, 'views', 'greet.html'),
          'utf-8',
          (err, content) => {
            if (err) throw err;
            res.end(content);
          }
        );
        break;
      default:
        break;
    }
  } else if (req.method === 'POST') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
    switch (req.url) {
      case '/greet':
        const body = [];
        req.on('data', (data) => {
          body.push(Buffer.from(data));
        });
        req.on('end', () => {
          const message = body.toString().split('=')[1];
          res.end(`
            <h1>ИДИ НАХУЙ, ${message}<h1>
            <a href="/"><h2>в начало хули</h2></a>
          `);
        });
        break;
      default:
        break;
    }
  }
});

server.listen(3000, () => {
  console.log('завелись, поехали');
});
