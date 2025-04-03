const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Sample user data
let userData = {
  username: 'octocat',
  totalXp: 0,
  xpHistory: []
};

// Mock GitHub events
const mockEvents = [
  {
    type: 'PullRequestEvent',
    created_at: new Date().toISOString(),
    repo: {
      name: 'octocat/Hello-World'
    },
    payload: {
      action: 'opened',
      pull_request: {
        number: 123,
        title: 'Fix bug in feature XYZ'
      }
    }
  },
  {
    type: 'PullRequestReviewEvent',
    created_at: new Date(Date.now() - 5000).toISOString(),
    repo: {
      name: 'octocat/Hello-World'
    },
    payload: {
      action: 'created',
      pull_request: {
        number: 122
      },
      review: {
        state: 'approved'
      }
    }
  },
  {
    type: 'IssueCommentEvent',
    created_at: new Date(Date.now() - 10000).toISOString(),
    repo: {
      name: 'octocat/Hello-World'
    },
    payload: {
      action: 'created',
      issue: {
        number: 120
      }
    }
  }
];

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Get mock GitHub events for a user
app.get('/api/mock/users/:username/events', (req, res) => {
  const username = req.params.username;
  console.log(`Getting events for user: ${username}`);
  
  // Create deep copy of mock events to avoid modifying the original
  const events = JSON.parse(JSON.stringify(mockEvents));
  
  // Update the timestamps to be more recent each time
  events.forEach((event, index) => {
    event.created_at = new Date(Date.now() - index * 5000).toISOString();
  });
  
  // Send response after a small delay to simulate API
  setTimeout(() => {
    res.json(events);
  }, 300);
});

// Get user data
app.get('/api/users/:username', (req, res) => {
  const username = req.params.username;
  
  if (username !== userData.username) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(userData);
});

// Update user XP
app.post('/api/xp', (req, res) => {
  const { eventType, xpAmount } = req.body;
  
  // Update XP in user data
  userData.totalXp += xpAmount;
  
  // Add to history
  userData.xpHistory.unshift({
    eventType,
    xpAmount,
    timestamp: new Date().toISOString()
  });
  
  // Keep history limited to 20 entries
  if (userData.xpHistory.length > 20) {
    userData.xpHistory = userData.xpHistory.slice(0, 20);
  }
  
  // Return updated user data
  res.json(userData);
});

// Reset user data (for testing)
app.post('/api/reset', (req, res) => {
  userData = {
    username: 'octocat',
    totalXp: 0,
    xpHistory: []
  };
  
  res.json(userData);
});

// Start the server
app.listen(port, () => {
  console.log(`Mock GitHub API server running at http://localhost:${port}`);
}); 