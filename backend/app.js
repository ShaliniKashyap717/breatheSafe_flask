const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;
