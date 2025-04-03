// GitHub Event Types
export type GitHubEventType = 'PullRequestEvent' | 'PullRequestReviewEvent' | 'IssueCommentEvent';

// XP History Entry
export interface XPHistoryEntry {
  amount: number;
  eventType: GitHubEventType;
  timestamp: string;
  level: number;
}

// Game Stats
export interface GameStats {
  level: number;
  xp: number;
  nextLevelXP: number;
  title: string;
  xpHistory: XPHistoryEntry[];
}

// XP Update Message
export interface XPUpdateMessage {
  type: 'XP_UPDATE';
  amount: number;
  eventType: GitHubEventType;
}

// GitHub Check Message
export interface CheckGitHubEventsMessage {
  action: 'checkGitHubEvents';
}

// Message Types
export type ExtensionMessage = XPUpdateMessage | CheckGitHubEventsMessage;

// XP Rewards Configuration
export const XP_REWARDS: Record<GitHubEventType, number> = {
  PullRequestEvent: 10,
  PullRequestReviewEvent: 8,
  IssueCommentEvent: 2
};

// Character Titles
export const TITLES: string[] = [
  "Noob",
  "Script Kid",
  "Junior Mage",
  "Code Knight",
  "Pull Request Paladin",
  "Merge Master",
  "Vue Overlord of the Universe"
]; 