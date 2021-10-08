<p align="center">
  <a href="https://www.npmjs.com/package/cors-tunnel"><img src="https://img.shields.io/npm/v/cors-tunnel.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/cors-tunnel"><img src="https://img.shields.io/npm/dt/cors-tunnel.svg?style=flat-square"></a><br/>
  Dev Api Tunnel - Because real-backends matters!!
</p>

# 💥 dev-api-tunnel
Http reverse proxy with CORS, cookies, origin and refer override!.

```
locahost:3000 -> tunnel-server localhost:3001 <- api.production.domain.com
```
## ℹ️ Usage
If you need a cookie for auth the session, copy it from the Browser and save to a file ".cookie[.env]"
```
npx cors-tunnel -p 3001 -t https://api.prod.domain.com -c .cookie.prod
```

Now your local Api server `http://localhost:3001` will forward requests to `https://api.prod.domain.com` overriding refer, origin, cookies and
adding CORS headers to the response

Enjoy running your local frontend `http://localhost:3000` using real backend services!

<br/><br/>

## 👏 Contributing

If you are interested in contributing to `cors-tunnel`, open an issue or a pr!

## 🎉 Thanks

Thank You, Open Source!

## 📜 License

`cors-tunnel` is 100% free and open-source, under [MIT](LICENSE).

