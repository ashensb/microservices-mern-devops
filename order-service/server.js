const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const orderRoutes = require('./routes/orderRoutes.js');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));