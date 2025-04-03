import { GitHubEventType, XP_REWARDS, ExtensionMessage } from '../types';

// Mock GitHub username for testing
const GITHUB_USERNAME = 'octocat';

// Create and inject notification container
function createNotificationContainer(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'github-rpg-notifications';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;
  document.body.appendChild(container);
  return container;
}

// Create notification element
function createNotification(message: string, xp: number): HTMLElement {
  const notification = document.createElement('div');
  notification.className = 'github-rpg-notification';
  notification.style.cssText = `
    background-color: #2c3e50;
    color: white;
    padding: 12px;
    border-radius: 4px;
    border: 2px solid #4a90e2;
    font-family: 'Press Start 2P', cursive;
    font-size: 12px;
    animation: slideIn 0.3s ease-out;
    max-width: 300px;
  `;
  notification.textContent = `🧙 +${xp} XP - ${message}`;
  return notification;
}

// Show notification
function showNotification(message: string, xp: number): void {
  const container = document.getElementById('github-rpg-notifications') || createNotificationContainer();
  const notification = createNotification(message, xp);
  container.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Check for GitHub events
async function checkGitHubEvents(): Promise<void> {
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`);
    const events = await response.json();
    
    // Process recent events
    events.forEach((event: { type: GitHubEventType }) => {
      const xp = XP_REWARDS[event.type];
      if (xp) {
        let message = '';
        switch (event.type) {
          case 'PullRequestEvent':
            message = 'You opened a Pull Request!';
            break;
          case 'PullRequestReviewEvent':
            message = 'You reviewed a Pull Request!';
            break;
          case 'IssueCommentEvent':
            message = 'You commented on an Issue!';
            break;
        }
        
        // Send XP update to popup
        chrome.runtime.sendMessage<ExtensionMessage>({
          type: 'XP_UPDATE',
          amount: xp,
          eventType: event.type
        });
        
        // Show notification
        showNotification(message, xp);
      }
    });
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
  }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message: ExtensionMessage) => {
  if (message.action === 'checkGitHubEvents') {
    checkGitHubEvents();
  }
});

// Initial check
checkGitHubEvents();

// Check every 15 seconds
setInterval(checkGitHubEvents, 15000); 