/**
 *  https://github.com/salvoravida/localhostify
 */

const { externalRedirects } = window.__LOCALHOSTIFY__;

chrome.webRequest.onHeadersReceived.addListener(
   function (details) {
      const headers = details.responseHeaders;

      for (var i = 0, l = headers.length; i < l; ++i) {
         if (headers[i].name.toLowerCase() === 'location') {
            const originalLocation = headers[i].value;

            externalRedirects.forEach((rule) => {
               if (new RegExp(rule.match).test(headers[i].value)) {
                  headers[i].value = headers[i].value.replace(rule.replace[0], rule.replace[1]);
               }
            });

            if (originalLocation !== headers[i].value) {
               const { url, documentUrl } = details;
               console.log('Localhostify -> ', { url, documentUrl, originalLocation, location: headers[i].value });
            }
         }
      }
      return { responseHeaders: headers };
   },
   { urls: ['<all_urls>'] },
   ['responseHeaders', 'blocking'],
);
