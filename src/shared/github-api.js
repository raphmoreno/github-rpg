// GitHub API base URL
const API_BASE_URL = 'https://api.github.com';

// Supported event types
const SUPPORTED_EVENTS = [
  'PullRequestEvent',
  'PullRequestReviewEvent',
  'IssueCommentEvent'
];

// Fetch GitHub events for a user
export async function fetchUserEvents(username) {
  const url = `${API_BASE_URL}/users/${username}/events?per_page=30`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const events = await response.json();
    
    // Filter to only include supported event types
    return events.filter(event => SUPPORTED_EVENTS.includes(event.type));
  } catch (error) {
    console.error('Error fetching GitHub events:', error);
    return [];
  }
}

// Process events and determine new ones since last check
export async function getNewEvents(username, lastCheckedTimestamp) {
  const events = await fetchUserEvents(username);
  
  if (!lastCheckedTimestamp) {
    // If this is the first check, just return the latest event to give initial XP
    return events.slice(0, 1);
  }
  
  const lastChecked = new Date(lastCheckedTimestamp);
  
  // Filter events that occurred after the last check
  return events.filter(event => {
    const eventDate = new Date(event.created_at);
    return eventDate > lastChecked;
  });
}

// Extract event details for display/storage
export function parseEventDetails(event) {
  const type = event.type;
  const repo = event.repo?.name || 'unknown';
  let details = { repo };
  
  switch (type) {
    case 'PullRequestEvent':
      details.action = event.payload?.action || 'opened';
      details.number = event.payload?.pull_request?.number;
      details.title = event.payload?.pull_request?.title;
      break;
      
    case 'PullRequestReviewEvent':
      details.action = event.payload?.action || 'reviewed';
      details.number = event.payload?.pull_request?.number;
      details.state = event.payload?.review?.state;
      break;
      
    case 'IssueCommentEvent':
      details.action = event.payload?.action || 'commented';
      details.number = event.payload?.issue?.number;
      break;
  }
  
  return details;
} 