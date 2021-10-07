const fs = require('fs');
const http = require('http');
const httpProxy = require('http-proxy');

const version = require('../package.json').version;
const port = Number(process.argv[2]);
const target = process.argv[3];
const sessionCookie = fs.readFileSync(`${process.argv[4]}`, 'utf8').trim();

const proxy = httpProxy.createProxyServer({});

/* override Cookie, Origin and Refer to target */
proxy.on('proxyReq', (proxyReq, req) => {
    proxyReq.setHeader('Cookie', sessionCookie);
    proxyReq.setHeader('origin', target);

    const referer = req.headers.referer;
    const origin = req.headers.origin;
    if (referer && origin) {
        proxyReq.setHeader('referer', referer.replace(origin, target));
    }
});

/* override headers from target to request */
proxy.on('proxyRes', (proxyRes, req) => {
    proxyRes.headers['Access-Control-Allow-Headers'] = 'content-type';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, PUT, POST, DELETE, HEAD';
    const origin = req.headers.origin;
    if (origin) {
        proxyRes.headers['Access-Control-Allow-Origin'] = origin;
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
    }
});

const server = http.createServer((req, res) => {
    if (req.method !== 'OPTIONS') {
        console.log(req.method, req.url);
        proxy.web(req, res, {
            changeOrigin: true,
            target,
        });
    } else {
        /* set Options headers for cors fetch option*/
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD');
        const origin = req.headers.origin;
        if (origin) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        res.end();
    }
});

console.log('\nApi Tunnel '+version);
console.log(`http://localhost:${port} -> ${target}`);

server.listen(port);
