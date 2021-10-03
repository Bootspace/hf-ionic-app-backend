const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

// Initialize variables
const app = express();

// CORS
app.use(cors({ origin: process.env.DOMAIN || '*', allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept', methods: 'GET,POST,PUT,DELETE,OPTIONS' }));

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Main route
const appRoutes = require('./routes/app');

// Import routes

// DB connection
mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/ionic-app', (err, res) => {
    if (err) throw err;
    console.log('DataBase: \x1b[32m%s\x1b[0m', 'online');
});

// Routes

// Sanity Check
app.use('/', appRoutes);

// Start listening
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server port 3000: \x1b[32m%s\x1b[0m', 'online');
});
