const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Add this line
const authRoutes = require('./routes/authRoute.js')
const protectedRoutes = require('./routes/protectedRoutes');

// Load .env file from the root of the project directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('MONGO:', process.env.MONGO); // Add this line to debug

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error(err);
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use protected routes
app.use('/api/protected', protectedRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

