const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');  // Import the cors middleware
const path = require('path'); // Add this line
const authRoutes = require('./routes/authRoute.js')
const protectedRoutes = require('./routes/protectedRoutes');
const dashboardRoutes = require('./routes/dashboardRoute'); // Add this line
const membershipRoutes = require('./routes/membershipRoute');
const profileRoutes = require('./routes/profileRoute');
const serviceRoutes = require('./routes/serviceRoute');
const bookingRoutes = require('./routes/bookingRoute');



// Load .env file from the root of the project directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('MONGO:', process.env.MONGO); // Add this line to debug

const app = express();

// Use CORS middleware
app.use(cors());

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

// Use dashboard routes
app.use('/api/dashboard', dashboardRoutes); // Add this line

// Use membership routes
app.use('/api/memberships', membershipRoutes);

// Use profile routes
app.use('/api/profile', profileRoutes);

app.use('/api/services', serviceRoutes);

app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

