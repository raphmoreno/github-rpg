// Default user data structure
const DEFAULT_USER_DATA = {
  username: 'octocat', // Default GitHub username
  totalXp: 0,
  lastChecked: null,
  xpHistory: []
};

// Get user data from storage
export async function getUserData() {
  return new Promise((resolve) => {
    chrome.storage.local.get('userData', (result) => {
      const userData = result.userData || DEFAULT_USER_DATA;
      resolve(userData);
    });
  });
}

// Save user data to storage
export async function saveUserData(userData) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ userData }, resolve);
  });
}

// Update XP with a new event
export async function addXp(eventType, xpAmount, eventDetails) {
  const userData = await getUserData();
  
  // Create history entry
  const historyEntry = {
    eventType,
    xpAmount,
    timestamp: new Date().toISOString(),
    details: eventDetails
  };
  
  // Update user data
  userData.totalXp += xpAmount;
  userData.xpHistory.unshift(historyEntry); // Add to beginning of array
  
  // Limit history to latest 20 entries
  if (userData.xpHistory.length > 20) {
    userData.xpHistory = userData.xpHistory.slice(0, 20);
  }
  
  // Update last checked time
  userData.lastChecked = new Date().toISOString();
  
  // Save to storage
  await saveUserData(userData);
  
  return userData;
}

// Set or update GitHub username
export async function setUsername(username) {
  const userData = await getUserData();
  userData.username = username;
  await saveUserData(userData);
  return userData;
}

// Clear all user data (for testing)
export async function resetUserData() {
  await saveUserData(DEFAULT_USER_DATA);
  return DEFAULT_USER_DATA;
} 