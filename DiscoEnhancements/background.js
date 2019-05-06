// Reset on installation
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({header_color: false});
    chrome.storage.local.set({subtle_header: false});
    chrome.storage.local.set({tab_name: true});
    chrome.storage.local.set({debug_text: false});
    chrome.storage.local.set({hide_debug: true});
    chrome.storage.local.set({generic_query: true});
    chrome.storage.local.set({is_disco: false});
    chrome.storage.local.set({refine_results: true});
    chrome.storage.local.set({tpl_editor: true});
});

// Listen for tab update
chrome.tabs.onUpdated.addListener(function(id, info, tab){
    chrome.tabs.executeScript(tab.id, {
        // Gets bmcAppInfo.yodelBlock (v10.2) or productTitle (v11+)
        "code": "document.querySelectorAll('div.bmcAppInfo.yodelBlock, span.productTitle')[0].textContent;"
    }, function (result) {
        var isDisco = result;

        // productTitle is a bit generic so do a check for "Discovery" in title text
        if ( isDisco && isDisco.includes("Discovery") ) {
            chrome.pageAction.show(tab.id);
            chrome.storage.local.set({is_disco: true});

            // If this is homepage, we want to grab and store the dashboards menu
            chrome.tabs.executeScript(tab.id, {
                "code": "document.getElementById('dashboards');"
                //"code": "document.getElementById('sideBarHolder');"
            }, function (result) {
                var dash = result;
                if (dash ) {
                  chrome.tabs.executeScript(tab.id, {
                    //"code": "document.getElementById('dashboards').innerHTML;"
                    "code": "document.getElementById('sideBarHolder').innerHTML;"
                  }, function (result) {
                    var dash_menu = result;
                    chrome.storage.local.set({dashboard: dash_menu});
                  })
                }
            })
        } else {
          chrome.storage.local.set({is_disco: false});
        }
    })
});
