// Reset on installation
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({header_color: false});
    chrome.storage.sync.set({tab_name: false});
    chrome.storage.sync.set({debug_text: false});
    chrome.storage.sync.set({hide_debug: false});
});

// Listen for tab update
chrome.tabs.onUpdated.addListener(function(id, info, tab){
    chrome.tabs.executeScript(tab.id, {
        // Gets bmcAppInfo.yodelBlock (v10.2) or productTitle (v11+)
        "code": "document.querySelectorAll('div.bmcAppInfo.yodelBlock, span.productTitle')[0].textContent;"
    }, function (result) {
        var isDisco = result[0];
        console.log(isDisco);

        // productTitle is a bit generic so do a check for "Discovery" in title text
        if ( isDisco.includes("Discovery") ) {
            chrome.pageAction.show(tab.id);
        }
    })
});