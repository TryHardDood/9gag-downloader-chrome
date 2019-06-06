chrome.runtime.onMessage.addListener(function (args) {
    chrome.downloads.download({
        url: args.url,
        filename: args.filename,
        saveAs: false
    });
});
