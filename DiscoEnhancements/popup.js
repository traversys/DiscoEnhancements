document.addEventListener('DOMContentLoaded', function(){

    var ch = document.getElementById('colorize-header');
    var sh = document.getElementById('subtle-header');
    var rt = document.getElementById('tab-rename');
    var hd = document.getElementById('hide-debug');
    var dh = document.getElementById('hide-dash');
    var gq = document.getElementById('generic-query');
	  var rr = document.getElementById('refine-top');
    var et = document.getElementById('tpl-editor');

    // set the initial state of the checkboxes
    chrome.storage.local.get("header_color", function(data){
        if (data["header_color"]){
            ch.checked = true;
        } else {
            ch.checked = false;
        }
      });

      chrome.storage.local.get("subtle_header", function(data){
          if (data["subtle_header"]){
              sh.checked = true;
          } else {
              sh.checked = false;
          }
        });

      chrome.storage.local.get("tab_name", function(data){
          if (data["tab_name"]){
              rt.checked = true;
          } else {
              rt.checked = false;
          }
        });

      chrome.storage.local.get("hide_debug", function(data){
          if (data["hide_debug"]){
              hd.checked = true;
          } else {
              hd.checked = false;
          }
        });

      chrome.storage.local.get("hide_dash", function(data){
          if (data["hide_dash"]){
              dh.checked = true;
          } else {
              dh.checked = false;
          }
        });

        chrome.storage.local.get("generic_query", function(data){
            if (data["generic_query"]){
                gq.checked = true;
            } else {
                gq.checked = false;
            }
          });

	chrome.storage.local.get("refine_results", function(data){
            if (data["refine_results"]){
                rr.checked = true;
            } else {
                rr.checked = false;
            }
          });

  chrome.storage.local.get("tpl_editor", function(data){
            if (data["tpl_editor"]){
                et.checked = true;
            } else {
                et.checked = false;
            }
          });

    ch.addEventListener("change", function(){
        chrome.storage.local.set({header_color: ch.checked});
    });

    sh.addEventListener("change", function(){
        chrome.storage.local.set({subtle_header: sh.checked});
    });

    rt.addEventListener("change", function(){
        chrome.storage.local.set({tab_name: rt.checked});
    });

    hd.addEventListener("change", function(){
        chrome.storage.local.set({hide_debug: hd.checked});
    });

    dh.addEventListener("change", function(){
        chrome.storage.local.set({hide_dash: dh.checked});
    });

    gq.addEventListener("change", function(){
        chrome.storage.local.set({generic_query: gq.checked});
    });

	  rr.addEventListener("change", function(){
        chrome.storage.local.set({refine_results: rr.checked});
    });

    et.addEventListener("change", function(){
          chrome.storage.local.set({tpl_editor: et.checked});
    });

    chrome.tabs.executeScript(null, {
        "code": "document.getElementById('debug');"
    }, function (result) {
        var isDebug = result[0];

        if ( isDebug ) {
            chrome.storage.local.set({debug_text: true});
            document.getElementById('debugText').innerHTML = "Debug is ON";
            document.getElementById('setDebug').value= "Turn Off Debug";
        } else {
            chrome.storage.local.set({debug_text: false});
            document.getElementById('debugText').innerHTML = null;
            document.getElementById('setDebug').value= "Turn On Debug";
    }
    })

    document.getElementById("setDebug").onclick = function() {
      chrome.storage.local.get("debug_text", function(data){
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
