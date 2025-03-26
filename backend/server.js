require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require("./config/db");
const UserRoutes = require("./routes/userRoutes");
const BookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 8000; 

// CORS setup
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database 
connectDb();

// Routes
app.use('/api', UserRoutes);
app.use('/api', BookRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
