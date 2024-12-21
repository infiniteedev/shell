const express = require('express');
const path = require('path');
const executeHandler = require('./api/execute'); // Adjust path as needed

const app = express();

// Use express to handle JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static frontend (index.html)
app.use(express.static(path.join(__dirname)));

// API route for executing commands
app.post('/api/execute', executeHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

