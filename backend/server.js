const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "https://parentingcontrol.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rules", require("./routes/ruleRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);