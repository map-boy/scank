// Local test target. Try: $env:BUSY_MS=20; npm run demo-server
import http from 'node:http';
const delay = Number(process.env.DELAY_MS || 0);
const busy = Number(process.env.BUSY_MS || 0);
const port = Number(process.env.PORT || 8080);
http
  .createServer((_req, res) => {
    if (busy > 0) {
      const end = Date.now() + busy;
      while (Date.now() < end) {}
    }
    setTimeout(() => {
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end('<h1>scank demo</h1>');
    }, delay);
  })
  .listen(port, () => console.log('demo server on ' + port + ' delay ' + delay + 'ms busy ' + busy + 'ms'));