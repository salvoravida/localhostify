<h3 align="center">
  <a href="https://www.npmjs.com/package/localhostify"><img src="https://img.shields.io/npm/v/localhostify.svg?style=flat-square"></a><br/>
  Because real-backends matters!!
</h3>

# 💥 localhostify
Concurrently Hot Reload any environments! </br>
HTTP reverse proxy with Hot Reload, CORS, cookies, origin, referer and external redirect override!

```properties
locahost:3001 === https://prod.domain.com/api/* & http://localhost:3000/*  
locahost:3002 === https://staging.domain.com/api/* & http://localhost:3000/*  
```

## ℹ️ Config

`.localhostify.js`
```js
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
      local: {  //optional obj if all default values
         // changeOrigin: true, //default value
         // autoRewrite: true,  //default value
         // host: 'http://localhost:3000' //default value
      },
      externalRedirects: [ //optional if needed 
         {
            match: '/api/auth/callback',
            replace: ['https://prod.domain.com', 'http://localhost:3001'],
         },
      ],
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

</br>

## 💥 Run
```
your-dev-server start
npx localhostify prod
npx localhostify staging
```
Browse `http://localhost:3001` and `http://localhost:3002` to enjoy local frotend mixed with real backends enviroments! Hot reload works concurrently!!

</br>


## 🍭 External Redirects
If your application use external login or SSO you will need to forward browser redirect to localhost.
This happens on the browser side, so we need a web extension.

```
npx localhostify --chrome-ext
```

This command will create a folder "localhostify-ext" on your project. Load it on Chrome Extensions Tab (Enable Dev Mode to see the LOAD button). That's all!.

Note: if you update your .localhostify.js config, please execute again `npx localhostify --chrome-ext` to update also the ext.
It the browser is opened, refresh all the exstensions.

Disable the ext if you are on `prod.domain.com`, otherwise it will redirect to locahost!</br>
<img width="159" alt="on" src="https://user-images.githubusercontent.com/20126259/137299423-ece3b5fc-d959-4a22-b325-ecd11ccd4487.png">
<img width="162" alt="off" src="https://user-images.githubusercontent.com/20126259/137299440-92e3f789-54e3-460b-847f-bef52ccdf468.png">

</br></br>

---
### 👏 Contributing

If you are interested in contributing to `localhostify`, open an issue or a pr!

### 🎉 Credits

Thank You, Open Source! </br>
Chrome Ext inspired by requestly.io

### 📜 License

`localhostify` is 100% free and open-source, under [MIT](LICENSE).

