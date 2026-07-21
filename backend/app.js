const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/students');

dotenv.config();

const app = express();

const rawOrigins = process.env.CLIENT_ORIGIN || '*';
const allowedOrigins = rawOrigins === '*'
  ? true
  : rawOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/students', studentRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Student Management System API is running...' });
});

app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

module.exports = app;
