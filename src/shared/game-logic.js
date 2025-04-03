// Available titles based on level
export const TITLES = [
  "Noob",           // level 1
  "Script Kid",     // level 2
  "Junior Mage",    // level 3
  "Code Knight",    // level 4
  "Pull Request Paladin",  // level 5
  "Merge Master",   // level 6
  "Vue Overlord of the Universe" // level 7+
];

// XP values for different actions
export const XP_VALUES = {
  PULL_REQUEST: 10,
  PULL_REQUEST_REVIEW: 8,
  ISSUE_COMMENT: 2
};

// Calculate XP needed for a specific level
export function xpForLevel(level) {
  return 50 * level;
}

// Get user's current level based on total XP
export function calculateLevel(totalXp) {
  let level = 1;
  let xpRequired = xpForLevel(level);
  
  while (totalXp >= xpRequired) {
    level++;
    xpRequired += xpForLevel(level);
  }
  
  return level;
}

// Get XP progress towards next level
export function calculateLevelProgress(totalXp) {
  const currentLevel = calculateLevel(totalXp);
  let xpForCurrentLevel = 0;
  
  // Calculate XP required for all previous levels
  for (let i = 1; i < currentLevel; i++) {
    xpForCurrentLevel += xpForLevel(i);
  }
  
  // Current XP within this level
  const currentLevelXp = totalXp - xpForCurrentLevel;
  
  // XP required for this level
  const requiredXp = xpForLevel(currentLevel);
  
  return {
    currentXp: currentLevelXp,
    requiredXp,
    percentage: Math.floor((currentLevelXp / requiredXp) * 100)
  };
}

// Get title based on level
export function getTitleForLevel(level) {
  if (level >= TITLES.length) {
    return TITLES[TITLES.length - 1];
  }
  return TITLES[level - 1];
}

// Map GitHub event types to XP values
export function getXpForEvent(eventType) {
  switch (eventType) {
    case 'PullRequestEvent':
      return XP_VALUES.PULL_REQUEST;
    case 'PullRequestReviewEvent':
      return XP_VALUES.PULL_REQUEST_REVIEW;
    case 'IssueCommentEvent':
      return XP_VALUES.ISSUE_COMMENT;
    default:
      return 0;
  }
}

// Get a human-readable description for an event
export function getEventDescription(eventType) {
  switch (eventType) {
    case 'PullRequestEvent':
      return 'opened a Pull Request';
    case 'PullRequestReviewEvent':
      return 'reviewed a Pull Request';
    case 'IssueCommentEvent':
      return 'commented on an Issue';
    default:
      return 'performed an action';
  }
} 