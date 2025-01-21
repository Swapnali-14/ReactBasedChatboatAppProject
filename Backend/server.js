const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // MySQL username
  password: '', // MySQL password
  database: 'chatboat_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

// API endpoint to send a message to the bot
app.post('/message', (req, res) => {
  const userMessage = req.body.userMessage;

  // Simple bot response logic
  let botResponse = 'Sorry, I didn\'t understand that.';
  if (userMessage.toLowerCase().includes('hello')||userMessage.toLowerCase().includes('hi')) {
    botResponse = 'Hello! How can I assist you today?';
  }

  // Save the conversation to the database
  const query = 'INSERT INTO chatboat_message (user_message, bot_response) VALUES (?, ?)';
  connection.query(query, [userMessage, botResponse], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving message' });
    }
    res.json({ botResponse });
  });
});

// API endpoint to get past messages
app.get('/messages', (req, res) => {
  connection.query('SELECT * FROM chatboat_messages ORDER BY created_at DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching messages' });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
