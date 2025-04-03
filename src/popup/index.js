import '../shared/style.css';
import { getUserData, setUsername, resetUserData } from '../shared/storage';
import { calculateLevel, calculateLevelProgress, getTitleForLevel } from '../shared/game-logic';
import { fetchUserEvents, getNewEvents, parseEventDetails } from '../shared/github-api';
import { getXpForEvent, getEventDescription } from '../shared/game-logic';
import { sendToastMessage } from '../shared/toast';

// DOM Elements
const characterTitle = document.getElementById('character-title');
const characterLevel = document.getElementById('character-level');
const characterXp = document.getElementById('character-xp');
const characterNextLevel = document.getElementById('character-next-level');
const xpProgressBar = document.getElementById('xp-progress-bar');
const usernameInput = document.getElementById('github-username');
const saveUsernameButton = document.getElementById('save-username');
const activityList = document.getElementById('activity-list');
const refreshButton = document.getElementById('refresh-button');
const resetButton = document.getElementById('reset-button');

// Initialize the popup
async function initPopup() {
  const userData = await getUserData();
  updateCharacterDisplay(userData);
  updateActivityList(userData.xpHistory);
  usernameInput.value = userData.username;
}

// Update character display based on XP
function updateCharacterDisplay(userData) {
  const level = calculateLevel(userData.totalXp);
  const progress = calculateLevelProgress(userData.totalXp);
  const title = getTitleForLevel(level);
  
  characterTitle.textContent = title;
  characterLevel.textContent = level;
  characterXp.textContent = progress.currentXp;
  characterNextLevel.textContent = progress.requiredXp;
  xpProgressBar.style.width = `${progress.percentage}%`;
}

// Update activity list
function updateActivityList(xpHistory) {
  if (!xpHistory || xpHistory.length === 0) {
    activityList.innerHTML = '<li class="text-center py-4">No recent activity</li>';
    return;
  }
  
  activityList.innerHTML = '';
  
  xpHistory.forEach(entry => {
    const date = new Date(entry.timestamp).toLocaleDateString();
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="text-rpg-accent">+${entry.xpAmount} XP</span> 
      on ${date} - ${getEventDescription(entry.eventType)}
    `;
    activityList.appendChild(li);
  });
}

// Check for new GitHub events and award XP
async function checkForNewEvents() {
  const userData = await getUserData();
  const { username, lastChecked } = userData;
  
  try {
    // Show loading state
    refreshButton.textContent = 'Loading...';
    refreshButton.disabled = true;
    
    // Get new events since last check
    const newEvents = await getNewEvents(username, lastChecked);
    let xpGained = 0;
    
    // Process each new event
    for (const event of newEvents) {
      const xpAmount = getXpForEvent(event.type);
      if (xpAmount > 0) {
        const details = parseEventDetails(event);
        // Add XP to user's total
        await addXpAndNotify(event.type, xpAmount, details);
        xpGained += xpAmount;
      }
    }
    
    // Refresh the display
    const updatedUserData = await getUserData();
    updateCharacterDisplay(updatedUserData);
    updateActivityList(updatedUserData.xpHistory);
    
    // Show completion message
    refreshButton.textContent = 'Refresh';
    refreshButton.disabled = false;
    
  } catch (error) {
    console.error('Error checking for new events:', error);
    refreshButton.textContent = 'Error';
    setTimeout(() => {
      refreshButton.textContent = 'Refresh';
      refreshButton.disabled = false;
    }, 2000);
  }
}

// Add XP and show notification
async function addXpAndNotify(eventType, xpAmount, details) {
  const message = getEventDescription(eventType);
  
  // Add XP via the shared storage module
  const { addXp } = await import('../shared/storage');
  const updatedData = await addXp(eventType, xpAmount, details);
  
  // Send toast notification to GitHub tabs
  await sendToastMessage(xpAmount, message);
  
  return updatedData;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initPopup);

saveUsernameButton.addEventListener('click', async () => {
  const username = usernameInput.value.trim();
  if (username) {
    await setUsername(username);
    const userData = await getUserData();
    updateCharacterDisplay(userData);
  }
});

refreshButton.addEventListener('click', checkForNewEvents);

resetButton.addEventListener('click', async () => {
  if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
    await resetUserData();
    initPopup();
  }
}); 