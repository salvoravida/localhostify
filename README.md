<p align="center">
  <a href="https://www.npmjs.com/package/cors-tunnel"><img src="https://img.shields.io/npm/v/cors-tunnel.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/cors-tunnel"><img src="https://img.shields.io/npm/dt/cors-tunnel.svg?style=flat-square"></a><br/>
  CORS Tunnel - Because real-backends matters!!
</p>

# cors-tunnel
Http reverse proxy with CORS and cookie tunneling - localhost:3001 -> api.prod.domain.com.

```
locahost:3000 -> CORS-cookie-free tunnel-server localhost:3001 <- api.production.domain.com
```
## Usage
If you need a cookie for auth the session, copy it from the Browser and save to a file ".cookie[.env]"
```
npx cors-tunnel -p 3001 -t https://api.prod.domain.com -c .cookie.prod"
```

Now your local Api server `http://localhost:3001` will forward requests to `https://api.prod.domain.com`
adding CORS headers to the response.

## Enojy dev/debug with real backend!
Enjoy running your local frontend `http://localhost:3000` using real backend services!



Contributors
------------
See [Contributors](https://github.com/salvoravida/redux-first-history/graphs/contributors).

License
-------
[MIT License](https://github.com/salvoravida/redux-first-history/blob/master/LICENSE.md).

