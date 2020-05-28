document.addEventListener("DOMContentLoaded", onDomLoad);

safari.self.addEventListener("message", processEvent);

Object.defineProperty(navigator, 'userAgent', {
    get: function () { return 'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0)'; }
    }
);

console.log("ayo");

function watchForChildren(ele, selector, callback) {
    for (const child of Array.from(ele.children).filter(child => child.matches(selector))) {
        callback(child);
    }
}

function watchForFutureChildren(ele, selector, callback) {
    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
                    callback(node);
                }
            }
        }
    }).observe(ele, { childList: true });
}

function processEvent(event) {
    if (event.name === "redditweaks.script") {
        eval(event.message["script"]);
    }
}

function onDomLoad() {
    if (window.top === window) {
        safari.extension.dispatchMessage("redditweaks.onDomLoaded");
    }
}