chrome.webNavigation.onCompleted.addListener(
    function (details) {
        if (details.frameId !== 0) return;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) return; // No active tab

            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    func: () => !!window.chrome?.runtime, // Check if the content script environment exists
                },
                (results) => {
                    if (chrome.runtime.lastError || !results || !results[0].result) {
                        console.warn("Content script not found on this page.");
                        return;
                    }

                    // If content script exists, send the message
                    chrome.tabs.sendMessage(tabs[0].id, { greeting: "Hello from background!", tabInfo: tabs[0] }, (response) => {
                        if (chrome.runtime.lastError) {
                            console.warn("Error sending message:", chrome.runtime.lastError.message);
                        } else {
                            console.log("Response from content script:", response);
                        }
                    });
                }
            );
        });
    },
    { url: [{ schemes: ["https"] }] }
);
