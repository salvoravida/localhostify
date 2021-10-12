<p align="center">
  <a href="https://www.npmjs.com/package/localhostify"><img src="https://img.shields.io/npm/v/localhostify.svg?style=flat-square"></a><br/>
  localhostify - Because real-backends matters!!
</p>

# 💥 localhostify
Concurrently Hot Reload any enviroments! </br>
HTTP reverse proxy with Hot Reload, CORS, cookies, origin, and refer override!.

```
locahost:3001 === https://prod.domain.com/api/* & http://localhost:3000/*  
locahost:3002 === https://staging.domain.com/api/* & http://localhost:3000/*  
```

## ℹ️ Config

`.localhostify.js`
```javascript
module.exports = {
   prod: {
      port: 3001,
      target: {
         host: 'https://prod.domain.com',
         matchUrl: '^\\/api*',
         // changeOrigin: true,  //default value
         // autoRewrite: true,   //default value
         // protocolRewrite: 'http',  //default value
      },
      local: {
         // changeOrigin: true, //default value
         // autoRewrite: true,  //default value
         // host: 'http://localhost:3000' //default value
      },
      // allowHeaders: 'content-type', //default cors value
   },
   staging: {
      port: 3002,
      target: {
         host: 'https://staging.domain.com',
         matchUrl: '^\\/api*',
      },
   },
};
```

## 💥 Run
```
your-dev-server start
npx localhostify prod
npx localhostify staging
```

Browse `http://localhost:3001` and `http://localhost:3002` to enjoy local frotend mixed with real backends enviroments!<br/>
Hot reload works concurrenly!!

<br/><br/>

## 👏 Contributing

If you are interested in contributing to `localhostify`, open an issue or a pr!

## 🎉 Thanks

Thank You, Open Source!

## 📜 License

`localhostify` is 100% free and open-source, under [MIT](LICENSE).

