function colorHeader(){
    chrome.storage.sync.get("header_color", function(data){
        var discoHeader = document.getElementById("level1Menu");
        var discoHeader112 = document.getElementById("pageHeader");
        if (data["header_color"]){
            var discoColor = window.getComputedStyle(document.getElementById("versionInfo")).getPropertyValue("background-image");
            discoHeader.style.cssText = "background-image:" + discoColor + " !important; background-size: cover";
            discoHeader112.style.cssText = "background-image:" + discoColor + " !important; background-size: cover";
        } else {
            discoHeader.style.cssText = null;
            discoHeader112.style.cssText = null;
        }
    });
};

function renameTab(){
    chrome.storage.sync.get("tab_name", function(data){
        if (data["tab_name"]){
            var versionInfo = document.getElementById('versionInfo').textContent;
            document.title = versionInfo;
        }
    })
};

function hideDebug(){
    chrome.storage.sync.get("hide_debug", function(data){
        var debugDiv = document.getElementById('debug');
        var nodeDebugDiv = document.getElementById('nodeDebug');
        if ( debugDiv ) {
          if (data["hide_debug"]){
            debugDiv.style.display = 'none';
            nodeDebugDiv.style.display = 'none';
          } else {
            debugDiv.style.display = 'block';
            nodeDebugDiv.style.display = 'block';
          }
        }
    })
};

function hideDash(){
    chrome.storage.sync.get("hide_dash", function(data){
        var dashDiv = document.getElementById('content1');
        if (data["hide_dash"]){
            dashDiv.style.display = 'none';
        } else {
            dashDiv.style.display = 'block';
        }
    })
};

function genericQuery(){
  chrome.storage.sync.get("is_disco", function(disco){
    if (disco["is_disco"]){
      chrome.storage.sync.get("generic_query", function(data){
        //var pageDiv = document.getElementById("pageHeader");
        //var pageDiv = document.getElementById("pageMainTitle");
        var pageDiv = document.getElementById("content1");
        var discoBox = document.getElementById('DiscoEx_GQBox');
        var content = document.getElementsByClassName("subContent");
        //var startStopSpan = document.getElementById("start_stop_span");
        if (data["generic_query"] && !(discoBox)) {
          var xhttp = new XMLHttpRequest();
          xhttp.open("GET", chrome.runtime.getURL("genericquery.html"), true);
          xhttp.send();

          xhttp.onreadystatechange = processRequest;
          function processRequest() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              pageDiv.insertAdjacentHTML('afterbegin', xhttp.responseText);
              // This is basically a backwards compatible fix for v10.2
              content[0].style.cssText = "padding-top: 25px !important;";
              // For search results on V11.2
              document.getElementsByClassName("searchTitle")[0].style.cssText = "padding-top: 33px !important;";
              //startStopSpan.style.cssText = "position:relative; top:-60px; float:none;";
            }
          }
        } else if (!data["generic_query"] && discoBox) {
            discoBox.remove();
            //startStopSpan.style.cssText = null;
        }
      })
    }
  })
};

function refineResults(){
    chrome.storage.sync.get("refine_results", function(data){
    var refineTop = document.getElementById('discoRefineTop');
        if (data["refine_results"] && !(refineTop)) {
             var formRefineResults = document.getElementById('refineResultsform');
             var container = document.getElementById('searchInfo');
             var newRefineTop = formRefineResults.cloneNode(true);
             newRefineTop.setAttribute('id','discoRefineTop');
             container.appendChild(newRefineTop);
             container.style.cssText = "text-align:right; float:none;";
             var resultsTable = document.getElementsByClassName('actionCaption')[0];
             if (!resultsTable) {
               var resultsTable = document.getElementById('resultsCaption');
             }
             resultsTable.style.cssText = "padding-bottom: 50px;";
        } else if (!data["refine_results"] && refineTop) {
            refineTop.remove();
            document.getElementById('resultsCaption').style.cssText = null;
            document.getElementsByClassName('actionCaption')[0].style.cssText = null;
        }
    })
};

chrome.storage.onChanged.addListener(colorHeader);
chrome.storage.onChanged.addListener(renameTab);
chrome.storage.onChanged.addListener(hideDebug);
chrome.storage.onChanged.addListener(hideDash);
chrome.storage.onChanged.addListener(genericQuery);
chrome.storage.onChanged.addListener(refineResults);
// run once on page load
colorHeader();
renameTab();
hideDebug();
hideDash();
genericQuery();
refineResults();
