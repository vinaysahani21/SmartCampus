const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors()); // Allows Angular to talk to Node
app.use(bodyParser.json());

// MongoDB Connection (We will use a local DB for now)
mongoose.connect('mongodb://127.0.0.1:27017/campus_db')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

// Simple Test Route
app.get('/', (req, res) => {
  // res.send('Campus API is running...');
});
const studentRoutes = require('./routes/studentRoutes');
const departmentRoutes = require('./routes/department');

app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);  

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'secure-token-123', user: 'Admin' });
  } else {
    res.status(401).json({ message: 'Invalid Username or Password' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});