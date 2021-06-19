function prefersColorScheme(is_dark) {
    if (is_dark) {
        chrome.browserAction.setIcon({
            path : "icon-dark.png"
        });
    } else  {
        chrome.browserAction.setIcon({
            path : "icon-light.png"
        });
    }
}
prefersColorScheme(window.matchMedia('(prefers-color-scheme: dark)'));

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
    prefersColorScheme(matches)
});