chrome.runtime.onMessage.addListener(async function (request) {
  if (request.chessGameData) {
    await chrome.tabs.create({ url: "https://lichess.org/analysis/" });
    function onTabUpdated(tabId, changeInfo, tab) {
      if (
        tab.url.indexOf("https://lichess.org/analysis") != -1 &&
        changeInfo.status == "complete"
      ) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: (request) => {
            document.getElementsByTagName("textarea")[0].value = request.chessGameData;
            document.getElementsByTagName("textarea")[0].click();
            document.getElementsByClassName("pgn")[0].getElementsByTagName("button")[0].click();
            if(!document.getElementsByClassName("switch")[0].getElementsByTagName('input')[0].checked) {
              document.getElementsByClassName("switch")[0].getElementsByTagName("label")[0].click();
            }
          },
          args: [request],
        });

        chrome.tabs.onUpdated.removeListener(onTabUpdated);
      }
    }
    chrome.tabs.onUpdated.addListener(onTabUpdated);
  }
});