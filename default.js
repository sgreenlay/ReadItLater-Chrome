'use strict';

chrome.tabs.executeScript(null,
    {
        code:"JSON.stringify({ url: location.href.toString(), title: document.title.toString() })"
    },
    (results) => {
        if (results === null || results === undefined)
        {
            window.close();
        }

        var page = JSON.parse(results[0]);
        var url = urlBase + '/api/Add?code=' + apiKey + '&url='+encodeURIComponent(page.url)+'&description='+encodeURIComponent(page.title)

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            window.close();
        };
        xhr.send();
    }
);