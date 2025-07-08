// Reset on first installation
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({
    header_color: false
  });
  chrome.storage.local.set({
    subtle_header: true
  });
  chrome.storage.local.set({
    tab_name: true
  });
  chrome.storage.local.set({
    debug_text: false
  });
  chrome.storage.local.set({
    hide_debug: true
  });
  chrome.storage.local.set({
    generic_query: true
  });
  chrome.storage.local.set({
    is_disco: false
  });
  chrome.storage.local.set({
    refine_results: true
  });
  chrome.storage.local.set({
    tpl_editor: true
  });
  chrome.storage.local.set({
    taxonomy_attrs: true
  });
  chrome.action.disable();
});

// Listen for tab update
// TODO: Better Appliance matching so the extension doesn't trigger on a regular website
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: function() {
      const el = document.querySelectorAll('div.bmcAppInfo.yodelBlock, span.productTitle')[0];
      return el ? el.textContent : null;
    }
  }, function(injectionResult) {
    const isDisco = injectionResult && injectionResult[0] ? injectionResult[0].result : null;

    // productTitle is a bit generic so do a check for "Discovery" in title text
    if (isDisco && isDisco.includes("Discovery")) {
      chrome.action.enable(tab.id);
      chrome.storage.local.set({ is_disco: true });

      // If this is homepage, we want to grab and store the dashboards menu
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: function() {
          return document.getElementById('dashboards');
        }
      }, function(result) {
        const dash = result && result[0] ? result[0].result : null;
        if (dash) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: function() {
              return document.getElementById('sideBarHolder').innerHTML;
            }
          }, function(res) {
            const dash_menu = res && res[0] ? res[0].result : null;
            chrome.storage.local.set({ dashboard: dash_menu });
          });
        }
      });
    } else {
      chrome.action.disable(tab.id);
      chrome.storage.local.set({ is_disco: false });
    }
  });
});
