import { GitHubRPG } from '../utils/GitHubRPG';
import { ExtensionMessage, GameStats, XPHistoryEntry } from '../types';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize game instance
  const game = new GitHubRPG();
  
  // Load saved state from chrome.storage
  const { savedState } = await chrome.storage.local.get('savedState') as { savedState: GameStats | undefined };
  if (savedState) {
    Object.assign(game, savedState);
  }

  // UI Elements
  const characterTitle = document.getElementById('characterTitle') as HTMLHeadingElement;
  const characterLevel = document.getElementById('characterLevel') as HTMLSpanElement;
  const currentXP = document.getElementById('currentXP') as HTMLSpanElement;
  const nextLevelXP = document.getElementById('nextLevelXP') as HTMLSpanElement;
  const xpProgress = document.getElementById('xpProgress') as HTMLDivElement;
  const xpHistoryList = document.getElementById('xpHistoryList') as HTMLDivElement;
  const refreshButton = document.getElementById('refreshButton') as HTMLButtonElement;

  // Update UI with current stats
  function updateUI(): void {
    const stats = game.getStats();
    
    characterTitle.textContent = stats.title;
    characterLevel.textContent = stats.level.toString();
    currentXP.textContent = stats.xp.toString();
    nextLevelXP.textContent = stats.nextLevelXP.toString();
    xpProgress.style.width = `${game.getXPProgress()}%`;

    // Update XP history
    xpHistoryList.innerHTML = stats.xpHistory
      .map((entry: XPHistoryEntry) => `
        <div class="xp-history-item">
          <span>+${entry.amount} XP</span>
          <span>${new Date(entry.timestamp).toLocaleDateString()}</span>
        </div>
      `)
      .join('');
  }

  // Handle refresh button click
  refreshButton.addEventListener('click', async () => {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab.id) {
      // Send message to content script to check for new events
      chrome.tabs.sendMessage<ExtensionMessage>(tab.id, { action: 'checkGitHubEvents' });
      
      // Save current state
      await chrome.storage.local.set({ savedState: game.getStats() });
    }
  });

  // Listen for XP updates from content script
  chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
    if (message.type === 'XP_UPDATE') {
      const { amount, eventType } = message;
      game.addXP(amount, eventType);
      updateUI();
    }
  });

  // Initial UI update
  updateUI();
}); 