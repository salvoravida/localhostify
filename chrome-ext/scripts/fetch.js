/**
 *  https://github.com/salvoravida/localhostify
 */

function interceptor() {
   const externalMatches = ['accounts.google.com'];
   const needIntercept = (url) => externalMatches.some((d) => new RegExp(d).test(url));
   const { externalRedirects } = window.__LOCALHOSTIFY__;

   const onReadyStateChange = function () {
      if (this.readyState === 4 && needIntercept(this.responseURL)) {
         const { responseURL, responseType, response } = this;

         if (responseType === '' || responseType === 'text') {
            Object.defineProperty(this, 'responseText', {
               get: function () {
                  let replacedResponse = response;

                  externalRedirects.forEach((rule) => {
                     if (new RegExp(rule.match).test(replacedResponse)) {
                        replacedResponse = replacedResponse.replace(rule.replace[0], rule.replace[1]);
                     }
                  });

                  if (response !== replacedResponse) {
                     console.log('Localhostify -> ', JSON.stringify({ responseURL, response, replacedResponse }, 0, 2));
                  }
                  return replacedResponse;
               },
            });
         }
      }
   };

   const XHR = XMLHttpRequest;
   XMLHttpRequest = function () {
      const xhr = new XHR();
      xhr.requestURL;
      xhr.addEventListener('readystatechange', onReadyStateChange.bind(xhr), false);
      return xhr;
   };

   XMLHttpRequest.prototype = XHR.prototype;
   Object.entries(XHR).map(([key, val]) => {
      XMLHttpRequest[key] = val;
   });

   const open = XMLHttpRequest.prototype.open;
   XMLHttpRequest.prototype.open = function (method) {
      this.method = method;
      open.apply(this, arguments);
   };

   const send = XMLHttpRequest.prototype.send;
   XMLHttpRequest.prototype.send = function (data) {
      this.requestData = data;
      send.apply(this, arguments);
   };

   let setRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
   XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
      this.requestHeaders = this.requestHeaders || {};
      this.requestHeaders[header] = value;
      setRequestHeader.apply(this, arguments);
   };
}

chrome.storage.sync.get(['active'], function (data) {
   if (data.active) {
      const interceptorScript = interceptor.toString();
      const config = 'window.__LOCALHOSTIFY__=' + JSON.stringify(window.__LOCALHOSTIFY__, 0, 2) + ';';

      const script = document.createElement('script');
      script.className = 'localhostify';
      script.type = 'text/javascript';
      script.appendChild(document.createTextNode(`${config} (${interceptorScript})()`));

      const parent = document.head || document.documentElement;
      parent.appendChild(script);
   }
});
