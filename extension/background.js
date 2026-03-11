// Cursus AI Extension - Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
    console.log("Cursus AI Extension installed successfully.");
});

// Listener for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getProfile") {
        // In a real app, this would fetch from Cursus API
        sendResponse({ name: "John Doe", email: "john@example.com" });
    }
    return true;
});
