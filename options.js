'use strict';

function loadOptions(evt) {
    chrome.storage.sync.get({
        url: '',
        apikey: ''
    }, function (items) {
        document.getElementById('url').value = items.url;
        document.getElementById('apikey').value = items.apikey;
    });
}

function saveOptions(evt) {
    evt.preventDefault();

    var url = document.getElementById('url').value;
    var apikey = document.getElementById('apikey').value;

    chrome.storage.sync.set({
        url: url,
        apikey: apikey
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}


document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('options').onsubmit = saveOptions;
