document.addEventListener('DOMContentLoaded', function(){

    var ch = document.getElementById('colorize-header');
    var rt = document.getElementById('tab-rename');
    var hd = document.getElementById('hide-debug');
    var dh = document.getElementById('hide-dash');
    var gq = document.getElementById('generic-query');

    // set the initial state of the checkboxes
    chrome.storage.sync.get("header_color", function(data){
        if (data["header_color"]){
            ch.checked = true;
        } else {
            ch.checked = false;
        }
      });

      chrome.storage.sync.get("tab_name", function(data){
          if (data["tab_name"]){
              rt.checked = true;
          } else {
              rt.checked = false;
          }
        });

      chrome.storage.sync.get("hide_debug", function(data){
          if (data["hide_debug"]){
              hd.checked = true;
          } else {
              hd.checked = false;
          }
        });

      chrome.storage.sync.get("hide_dash", function(data){
          if (data["hide_dash"]){
              dh.checked = true;
          } else {
              dh.checked = false;
          }
        });

        chrome.storage.sync.get("generic_query", function(data){
            if (data["generic_query"]){
                gq.checked = true;
            } else {
                gq.checked = false;
            }
          });

    ch.addEventListener("change", function(){
        chrome.storage.sync.set({header_color: ch.checked});
    });

    rt.addEventListener("change", function(){
        chrome.storage.sync.set({tab_name: rt.checked});
    });

    hd.addEventListener("change", function(){
        chrome.storage.sync.set({hide_debug: hd.checked});
    });

    dh.addEventListener("change", function(){
        chrome.storage.sync.set({hide_dash: dh.checked});
    });

    gq.addEventListener("change", function(){
        chrome.storage.sync.set({generic_query: gq.checked});
    });

    chrome.tabs.executeScript(null, {
        "code": "document.getElementById('debug');"
    }, function (result) {
        var isDebug = result[0];

        if ( isDebug ) {
            chrome.storage.sync.set({debug_text: true});
            document.getElementById('debugText').innerHTML = "Debug is ON";
            document.getElementById('setDebug').value= "Turn Off Debug";
        } else {
            chrome.storage.sync.set({debug_text: false});
            document.getElementById('debugText').innerHTML = null;
            document.getElementById('setDebug').value= "Turn On Debug";
    }
    })

    document.getElementById("setDebug").onclick = function() {
      chrome.storage.sync.get("debug_text", function(data){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          var currentURL = tabs[0].url;
          var cleanURL = currentURL.split("&")[0];
          if (data["debug_text"]){
            var debugParam = "&debug=0";
            } else {
            var debugParam = "&debug=1";
          }
          chrome.tabs.update(tabs[0].id, {url: cleanURL + debugParam});
          window.close();
          })
      })
    }

});
