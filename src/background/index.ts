import { ExtensionMessage } from '../types';

// Initialize extension
chrome.runtime.onInstalled.addListener(() => {
  // Set initial state
  chrome.storage.local.set({
    savedState: {
      level: 1,
      xp: 0,
      xpHistory: []
    }
  });
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.type === 'XP_UPDATE') {
    // Forward XP updates to all tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.id) {
          chrome.tabs.sendMessage<ExtensionMessage>(tab.id, message).catch(() => {
            // Ignore errors for inactive tabs
          });
        }
      });
    });
  }
}); 