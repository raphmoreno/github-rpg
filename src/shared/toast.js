import 'toastify-js/src/toastify.css';
import Toastify from 'toastify-js';

// Create a custom toast notification
export function showXpToast(xpAmount, message) {
  // Create pixel-style toast with RPG theme
  Toastify({
    text: `🧙 +${xpAmount} XP – ${message}!`,
    duration: 4000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient(to right, #4A2C8F, #8F6FC5)",
      color: "white",
      border: "4px solid #1E1E3F",
      boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.75)",
      borderRadius: "0",
      fontFamily: "'Press Start 2P', cursive",
      fontSize: "12px",
      padding: "12px"
    },
    offset: {
      x: 16, 
      y: 16
    }
  }).showToast();
}

// Send a message to the content script to show a toast
export function sendToastMessage(xpAmount, message) {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url.includes('github.com')) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { 
            type: 'SHOW_TOAST', 
            data: { xpAmount, message } 
          },
          resolve
        );
      } else {
        resolve();
      }
    });
  });
} 