require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const connectDB = require('./utils/db.js');
const userRoute = require("./routes/usersRoute.js");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: 'https://rividco.netlify.app', // Allow your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Specify allowed methods
  credentials: true, // Allow cookies and credentials
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static('Public'));
app.set("view engine", "ejs");

// Handle preflight requests (OPTIONS method)
app.options('*', cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Express Server");
});
app.use("/api", userRoute);

// Server Initialization
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export the app object
