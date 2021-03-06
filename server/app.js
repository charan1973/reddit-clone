require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Mongoose congig
mongoose.connect(
  process.env.DB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("DB connected");
  }
);

//Import routes
const authRoutes = require("./routes/auth");
const subredditRoutes = require("./routes/subreddit");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

//Use routes
app.use("/api", authRoutes);
app.use("/api", subredditRoutes);
app.use("/api", postRoutes);
app.use("/api", userRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Serve frontend files
  app.use(express.static("../client/build"));
  // Getting all the routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve("../client/build/index.html"));
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
