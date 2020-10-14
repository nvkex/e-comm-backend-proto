const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Route Dependencies
const authRouter = require('./routes/auth.route');

// Init
const app = express();
dotenv.config();

// Choose a port to listen to.
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB Database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(res => {
    console.log('Connected to ' + res.connection.host);
})
.catch(e => {
    console.log(e);
})

// Routes
app.use('/auth', authRouter);

// Listen on a port
app.listen(PORT, () => {
    console.log('Listening on ' + PORT);
})