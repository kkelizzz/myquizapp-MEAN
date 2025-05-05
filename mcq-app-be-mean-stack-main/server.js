const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors()); // to connect frontend and backend
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use('/api/tests', require("./routes/testRoutes"));
app.use('/api/questions', require("./routes/questionRoutes"));
app.use('/api/reports', require('./routes/reportRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
