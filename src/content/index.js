import { showXpToast } from '../shared/toast';

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SHOW_TOAST') {
    const { xpAmount, message: toastMessage } = message.data;
    showXpToast(xpAmount, toastMessage);
    sendResponse({ success: true });
  }
  return true; // Indicates we'll send a response asynchronously
}); 