/**
 *  https://github.com/salvoravida/localhostify
 */

const { externalRedirects } = window.__LOCALHOSTIFY__;

let localhostifyEnabled = true;

function onIconClick(toggle) {
   chrome.storage.sync.get(['active'], function (data) {
      console.log('StorageGet Active :', JSON.stringify(data));
      const active = toggle ? !data.active : data.active === undefined ? localhostifyEnabled : data.active;
      localhostifyEnabled = active;
      chrome.browserAction.setIcon({ path: active ? 'assets/green.png' : 'assets/red.png' });
      chrome.storage.sync.set({ active }, function () {
         console.log('StorageSet Active set:', active);
      });
   });
}

chrome.browserAction.onClicked.addListener(() => onIconClick(true));

onIconClick();

//http intercept
chrome.webRequest.onHeadersReceived.addListener(
   function (details) {
      if (!localhostifyEnabled) return;
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
   ['blocking', 'responseHeaders', chrome.webRequest.OnHeadersReceivedOptions.EXTRA_HEADERS].filter(Boolean),
);
