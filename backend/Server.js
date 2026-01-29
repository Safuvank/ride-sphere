const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')


const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

// connect to Mongodb
connectDB()


// console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to ridesphere");
});

// API routes
app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
});
