import * as httpProxy from "http-proxy";
import yargs from "yargs";
const fs = require("fs");
const http = require("http");

const version = require("../package.json").version;

export function run() {
  console.log("\nDev Api Tunnel " + version);
  const { argv } =  yargs(process.argv.slice(2))
  const port = Number(argv.p || 3001);

  if (!argv.t) throw new Error('No target!');

  const target = argv.t;
  const sessionCookie =argv.c ? fs.readFileSync(`${argv.c}`, "utf8").trim() : '';

  const proxy = httpProxy.createProxyServer({});

  /* override Cookie, Origin and Refer to target */
  proxy.on("proxyReq", (proxyReq, req) => {
    if (sessionCookie) proxyReq.setHeader("Cookie", sessionCookie);
    proxyReq.setHeader("origin", target);

    const referer = req.headers.referer;
    const origin = req.headers.origin;
    if (referer && origin) {
      proxyReq.setHeader("referer", referer.replace(origin, target));
    }
  });

  /* override headers from target to request */
  proxy.on("proxyRes", (proxyRes, req) => {
    proxyRes.headers["Access-Control-Allow-Headers"] = "content-type";
    proxyRes.headers["Access-Control-Allow-Methods"] =
      "GET, PUT, POST, DELETE, HEAD";
    const origin = req.headers.origin;
    if (origin) {
      proxyRes.headers["Access-Control-Allow-Origin"] = origin;
      proxyRes.headers["Access-Control-Allow-Credentials"] = "true";
    }
  });

  const server = http.createServer((req, res) => {
    if (req.method !== "OPTIONS") {
      console.log(req.method, req.url);
      proxy.web(req, res, {
        changeOrigin: true,
        target,
      });
    } else {
      /* set Options headers for cors fetch option*/
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, HEAD"
      );
      const origin = req.headers.origin;
      if (origin) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        res.setHeader("Access-Control-Allow-Credentials", "true");
      }
      res.end();
    }
  });

  console.log(`http://localhost:${port} -> ${target}`);

  server.listen(port);
}
