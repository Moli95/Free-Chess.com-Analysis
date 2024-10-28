function run() {
    waitForElm(".game-over-modal-buttons").then((elem) => {
        const button = createButton();
        elem.append(button);

        button.addEventListener("click", () => {
            document
                .getElementsByClassName("live-game-buttons-component")[0]
                .getElementsByTagName("button")[0]
                .click();
            waitForElm(".share-menu-tab-selector-component").then((elm) => {
                document
                    .getElementsByClassName("share-menu-tab-selector-component")[0]
                    .getElementsByTagName("div")[0]
                    .click();
                document.querySelector(".ui_outside-close-icon").click();
                chrome.runtime.sendMessage({
                    chessGameData: document.getElementsByTagName("textarea")[0].value,
                });
            });
        });
    });
}

function waitForElm(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

function createButton() {
    const button = document.createElement("button");
    button.classList.add("ui_v5-button-component", "ui_v5-button-primary", "ui_v5-button-large");
    button.innerHTML = `Free Lichess Analysis`;

    return button;
}

document.addEventListener("DOMContentLoaded", run);
