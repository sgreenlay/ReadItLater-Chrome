'use strict';

chrome.tabs.executeScript(null,
    {
        code: "JSON.stringify({ url: location.href.toString(), title: document.title.toString() })"
    },
    (results) => {
        if (results === null || results === undefined) {
            window.close();
        }
        var page = JSON.parse(results[0]);

        chrome.storage.sync.get({
            url: "",
            apikey: ""
        }, function (items) {

            if (items.url === "" || items.apikey === "") {
                document.getElementById("page").innerHTML = `Please <a id="options" href="#">configure</a>.`;
                document.getElementById("options").onclick = function (evt) {
                    evt.preventDefault();
                    if (chrome.runtime.openOptionsPage) {
                        chrome.runtime.openOptionsPage();
                    } else {
                        window.open(chrome.runtime.getURL('options.html'));
                    }
                };
            }
            else {
                var urlBase = items.url;
                var apiKey = items.apikey;

                var url = urlBase + '/api/Add?code=' + apiKey + '&url=' + encodeURIComponent(page.url) + '&description=' + encodeURIComponent(page.title)

                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.onload = function () {
                    window.close();
                };
                xhr.send();
            }
        });
    }
);