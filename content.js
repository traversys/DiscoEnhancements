function colorHeader(){
    chrome.storage.sync.get("header_color", function(data){
        var discoHeader = document.getElementById("level1Menu");
        if (data["header_color"]){
            var discoColor = window.getComputedStyle(document.getElementById("versionInfo")).getPropertyValue("background-image");
            discoHeader.style.cssText = "background-image:" + discoColor + " !important; background-size: cover";
        } else {
            discoHeader.style.cssText = null;
        }
    });
}

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
        if ( debugDiv ) {
          if (data["hide_debug"]){
            debugDiv.style.display = 'none';
          } else {
            debugDiv.style.display = 'block';
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


chrome.storage.onChanged.addListener(colorHeader);
chrome.storage.onChanged.addListener(renameTab);
chrome.storage.onChanged.addListener(hideDebug);
chrome.storage.onChanged.addListener(hideDash);
// run once on page load
colorHeader();
renameTab();
hideDebug();
hideDash();
