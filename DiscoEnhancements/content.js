function subtleHeader(){
    chrome.storage.local.get("subtle_header", function(data){
        var discoHeader113 = document.getElementById("pageHeader");
        if (data["subtle_header"]){
            var discoColor = window.getComputedStyle(document.getElementById("versionInfo")).getPropertyValue("background-image");
            discoHeader113.style.borderImage = discoColor + "10 round";
            discoHeader113.style.borderBottom = "4px solid";
            document.getElementById("versionInfo").style.boxShadow = "none";
            document.getElementById("versionInfo").style.padding = "5px 10px";
            document.getElementById("applianceStateContainer").style.fontSize = "1.2rem";

        } else {
            discoHeader113.style.borderImage = null;
            discoHeader113.style.borderBottom = "2px solid #f86e00";
            document.getElementById("versionInfo").style.padding = "1px 10px";
            document.getElementById("applianceStateContainer").style.fontSize = ".84rem";
        }
    });
};

function colorHeader(){
    chrome.storage.local.get("header_color", function(data){
        var discoHeader = document.getElementById("level1Menu");
        var discoHeader112 = document.getElementById("pageHeader");
        if (data["header_color"]){
            var discoColor = window.getComputedStyle(document.getElementById("versionInfo")).getPropertyValue("background-image");
            //discoHeader.style.cssText = "background-image:" + discoColor + " !important; background-size: cover;";
            //discoHeader112.style.cssText = "background-image:" + discoColor + " !important; background-size: cover;";
            discoHeader.style.backgroundImage = discoColor;
            discoHeader112.style.backgroundImage = discoColor;
        } else {
            discoHeader.style.backgroundImage = null;
            discoHeader112.style.backgroundImage = null;
        }
    });
};

function tplEditor(){
    chrome.storage.local.get("tpl_editor", function(data){
        // Remove Line Numbers
        if (data["tpl_editor"]){
            // Make pre tags editable
            //var pre_tpl = document.getElementById('moduleCode');
            //pre_tpl.setAttribute("contenteditable",true);
            //pre_tpl.insertAdjacentHTML('beforebegin','<p>TPL Editor is ON.</p>');

            // Add buttons
            button_bar = document.getElementsByClassName('buttonBar rightAlign')[0];
            //document.getElementsByClassName("editModuleButton")[0].value = "Edit Raw";
            edit_raw = document.getElementsByClassName("editModuleButton")[0];

            // Convert code to text
            var quick_edit = document.createElement("button");
            quick_edit.innerHTML = "Edit Raw Text";
            quick_edit.setAttribute('type', 'button');
            //button_bar.appendChild(quick_edit);
            edit_raw.parentNode.replaceChild(quick_edit, edit_raw);
            // Copy TPL
            var quick_copy = document.createElement("button");
            quick_copy.innerHTML = "Copy TPL";
            quick_copy.setAttribute('type', 'button');
            button_bar.appendChild(quick_copy);
            quick_copy.addEventListener("click", function() {
              tpl_code = module_code;
              tpl_code.select();
              document.execCommand("copy");
              alert("TPL copied to clipboard!");
            });
            quick_copy.disabled = true;
            quick_edit.addEventListener("click", function() {
              button_bar.innerHTML = '<input type="submit" name="upload" value="Apply">';
              button_bar.innerHTML += '<input type="submit" name="reset" value="Reset" onclick="location.reload();">';
              module_code = document.getElementById('moduleCode');
              var line_nos = module_code.getElementsByClassName('linenumber');
              while (line_nos.length) {
                line_nos[0].remove();
              }
              tpl_code = module_code.innerText;
              module_code.remove();
              var tpl_window = document.getElementsByClassName('patternContent clearFloatsBefore')[0];
              tpl_window.innerHTML += '<textarea name="tplCode" rows="50" class="tplCode" id="moduleCode"></textarea>';
              module_code = document.getElementById('moduleCode');
              module_code.value = tpl_code;
              module_code.style.cssText = "border:2px solid #89c341;";
              button_bar.appendChild(quick_copy);
              quick_copy.disabled = false;
            });
        }
    });
};

function renameTab(){
    chrome.storage.local.get("tab_name", function(data){
        if (data["tab_name"]){
            var versionInfo = document.getElementById('versionInfo').textContent;
            document.title = versionInfo;
        }
    })
};

function hideDebug(){
    chrome.storage.local.get("hide_debug", function(data){
        var debugDiv = document.getElementById('debug');
        var nodeDebugDiv = document.getElementById('nodeDebug');
        if (data["hide_debug"]){
          if ( debugDiv ) {
              debugDiv.style.display = 'none';
            } else {
              debugDiv.style.display = 'block';
            }
          if ( nodeDebugDiv ) {
            nodeDebugDiv.style.display = 'none';
          } else {
            nodeDebugDiv.style.display = 'block';
          }
        }
    })
};

function hideDash(){
    chrome.storage.local.get("hide_dash", function(data){
        var dashDiv = document.getElementById('content1');
        if (data["hide_dash"]){
            dashDiv.style.display = 'none';
        } else {
            dashDiv.style.display = 'block';
        }
    })
};

function genericQuery(){
  chrome.storage.local.get("is_disco", function(disco){
    if (disco["is_disco"]){
      chrome.storage.local.get("generic_query", function(data){
        //var pageDiv = document.getElementById("pageHeader");
        //var pageDiv = document.getElementById("pageMainTitle");
        var pageDiv = document.getElementById("pageHeader");
        var discoBox = document.getElementById('DiscoEx_GQBox');
        var content = document.getElementsByClassName("subContent");
        var v112_title = document.getElementsByClassName("searchTitle");
        //var startStopSpan = document.getElementById("start_stop_span");
        if (data["generic_query"] && !(discoBox)) {
          var xhttp = new XMLHttpRequest();
          xhttp.open("GET", chrome.runtime.getURL("genericquery.html"), true);
          xhttp.send();
          xhttp.onreadystatechange = processRequest;
          function processRequest() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              pageDiv.insertAdjacentHTML('beforeend', xhttp.responseText);
              // This is basically a backwards compatible fix for v10.2
              content[0].style.cssText = "padding-top: 25px !important;";
              // For search results on V11.2
              if ( (v112_title && v112_title.length) ) {
                v112_title[0].style.cssText = "padding-top: 33px !important;";
              }
              // Get RAW query if it exists for page
              var raw_query = document.getElementById("rawQueryHolder");
              if (raw_query && raw_query.textContent){
                  document.getElementById('searchquery').value = raw_query.textContent;
              }
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
    chrome.storage.local.get("refine_results", function(data){
    var refineTop = document.getElementById('discoRefineTop');
        if (data["refine_results"] && !(refineTop)) {
             var formRefineResults = document.getElementById('refineResultsform');
             if ( (formRefineResults) ) {
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
             }
        } else if (!data["refine_results"] && refineTop) {
            refineTop.remove();
            document.getElementById('resultsCaption').style.cssText = null;
            document.getElementsByClassName('actionCaption')[0].style.cssText = null;
        }
    })
};



function addDash(){
  chrome.storage.local.get("dashboard", function(data){
    sideBarHTML = data["dashboard"][0];
    //console.log(sideBarHTML);
    if ( data["dashboard"] && data["dashboard"].length ) {
      var home_body = document.getElementById('HomeBody');
      if ( !home_body ) {
        //var sideBar = document.getElementById("sideBarHolder");
        //sideBar.appendChild(data["dashboard"][0]);
        var sideBar = document.getElementById("sideBarHolder");
        var sideDash = document.createElement("div");
        sideDash.setAttribute('id', 'sideBarHolder');
        sideDash.setAttribute('class', 'sideBarHolder');
        sideDash.innerHTML = sideBarHTML;
        sideBar.parentNode.replaceChild(sideDash, sideBar);
        // Need to modify the menu links so they point to the home page
        base = window.location.protocol + "//" + window.location.host + "/ui/";
        list = document.getElementsByClassName("dashboardListHolder")[0];
        var ul = list.getElementsByTagName("ul")[0];
        var links = ul.getElementsByTagName("li");
        for (var i = 0; i < links.length; ++i) {
          href = links[i].getElementsByTagName("a")[0].href;
          var id = href.match(/(\?.*)/)[1];
          new_href = base + id;
          links[i].getElementsByTagName("a")[0].href = base + id;
          //console.log(new_href);
        }
      }
    }
  })
};

function addTools(){
  // Taxomony Link
  var sideBar = document.getElementById("sideBarHolder");
  var link = document.createElement('a');
  var img = document.createElement('img');
  img.setAttribute('src', '/styles/default/images/model/png/normal/taxonomy_32.png');
  img.setAttribute('width','24');
  img.setAttribute('height','24');
  img.setAttribute('style', '-webkit-filter:brightness(100)');
  link.appendChild(img);
  link.title = "View Taxonomy";
  link.alt = "View Taxonomy";
  link.id = "imageForSetupModelTaxonomy";
  link.style.background = null;
  //link.href = window.location.protocol + "//" + window.location.host + "/ui/SetupModelTaxonomy";
  link.href = "/ui/SetupModelTaxonomy";
  sideBar.insertBefore(link, sideBar.firstChild);

  // CMDB Sync
  var link = document.createElement('a');
  var img = document.createElement('img');
  img.setAttribute('src', '/styles/default/images/integrations/png/normal/cmdb_export_32.png');
  img.setAttribute('width','24');
  img.setAttribute('height','24');
  img.setAttribute('style', '-webkit-filter:brightness(100);padding-right:10px');
  link.appendChild(img);
  link.title = "Manage CMDB Sync";
  link.alt = "Manage CMDB Sync";
  link.id = "imageForSetupSyncTargetOverview";
  link.style.background = null;
  link.href = "/ui/SetupSyncTargetOverview";
  sideBar.insertBefore(link, sideBar.firstChild);
};

chrome.storage.onChanged.addListener(colorHeader);
chrome.storage.onChanged.addListener(subtleHeader);
chrome.storage.onChanged.addListener(renameTab);
chrome.storage.onChanged.addListener(hideDebug);
chrome.storage.onChanged.addListener(hideDash);
chrome.storage.onChanged.addListener(genericQuery);
chrome.storage.onChanged.addListener(refineResults);
chrome.storage.onChanged.addListener(tplEditor);
// run once on page load
colorHeader();
subtleHeader()
renameTab();
hideDebug();
hideDash();
genericQuery();
refineResults();
tplEditor();
addDash();
addTools();
