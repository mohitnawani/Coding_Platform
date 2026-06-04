const express = require('express');
const app = express();
require('dotenv').config();
const main = require('./config/db');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/userAuth');
const redisClient = require('./config/redis');
const problemRouter = require('./routes/problemCreator');
const submitRouter = require('./routes/submit.js');
const aiRouter = require('./routes/aiChatting');
const videosSection = require('./routes/videoSection');
const cors = require('cors');
const submissionsRouter= require('./routes/submissionsDetail');
const commentRouter= require('./routes/commentRoute');

const allowedOrigins = [
  'http://localhost:5173', 
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL || '', // Add your Vercel frontend URL here
  'https://*.vercel.app'
].filter(url => url);

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches Vercel pattern
    if (allowedOrigins.includes(origin) || /https:\/\/.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRouter);           // Google OAuth & Local Auth
app.use('/user', authRouter);               // Keep existing user routes
app.use('/problem', problemRouter);
app.use('/submission', submitRouter);
app.use('/ai', aiRouter);
app.use('/uploads', videosSection);
app.use('/submissionDetail', submissionsRouter);
app.use('/comment', commentRouter);

// Health Check
// app.get('/api/health', (req, res) => {
//   res.json({ message: 'Server is running', status: 'OK' });
// });

// Initialize Server
const InitalizeConnection = async () => {
  try {
    await Promise.all([main(), redisClient.connect()]);
    console.log('✅ DB Connected');
    console.log('✅ Redis Connected');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server listening at port: ${process.env.PORT}`);
      console.log(`📍 Running at: http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error('❌ Initialization Error:', err);
    process.exit(1);
  }
};

InitalizeConnection();

module.exports = app;