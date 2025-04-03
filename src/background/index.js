import { getUserData } from '../shared/storage';
import { getNewEvents, parseEventDetails } from '../shared/github-api';
import { getXpForEvent, getEventDescription } from '../shared/game-logic';

// Setup alarm for periodic checks
chrome.runtime.onInstalled.addListener(() => {
  // Check for new events every 15 seconds
  chrome.alarms.create('checkGitHubEvents', { periodInMinutes: 0.25 });
  
  console.log('GitHub RPG extension installed. Checking for events every 15 seconds.');
});

// Listen for alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'checkGitHubEvents') {
    await checkForNewEvents();
  }
});

// Check for new GitHub events and process them
async function checkForNewEvents() {
  try {
    const userData = await getUserData();
    const { username, lastChecked } = userData;
    
    // Don't proceed if we don't have a username yet
    if (!username) return;
    
    // Get new events
    const newEvents = await getNewEvents(username, lastChecked);
    
    // Process each new event
    for (const event of newEvents) {
      const xpAmount = getXpForEvent(event.type);
      
      if (xpAmount > 0) {
        const details = parseEventDetails(event);
        const message = getEventDescription(event.type);
        
        // Add XP to the user's total
        const { addXp } = await import('../shared/storage');
        await addXp(event.type, xpAmount, details);
        
        // Show notification if on GitHub
        await notifyGitHubTabs(xpAmount, message);
      }
    }
  } catch (error) {
    console.error('Error checking for GitHub events:', error);
  }
}

// Notify all GitHub tabs about XP gain
async function notifyGitHubTabs(xpAmount, message) {
  const tabs = await chrome.tabs.query({ url: 'https://github.com/*' });
  
  for (const tab of tabs) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: 'SHOW_TOAST',
        data: { xpAmount, message }
      });
    } catch (error) {
      // Tab might not have content script loaded yet, ignore error
    }
  }
} 