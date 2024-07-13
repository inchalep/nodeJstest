const express = require("express");
const connectDB = require("./config/db");
const app = express();
const routes = require("./routes/index");
require("dotenv").config();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
