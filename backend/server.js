/**
 * Simple Express server for Contact Book
 * Run: npm install && node server.js
 */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/contacts');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRouter);

// DB & server
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0/contactbook';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log('Server running on port', PORT));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
