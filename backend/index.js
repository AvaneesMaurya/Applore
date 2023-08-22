const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = 5000;
const app = express();
const dev = require("./config/dev");
const server = require("http").createServer(app);
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const blogsRoutes = require("./routes/blogRoutes");
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

try {
  mongoose.set("strictQuery", true);
  mongoose.connect(dev.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  console.log(err.message);
}

mongoose.connection
  .once("open", () => {
    console.log("database connected");
  })
  .on("disconnected", () => {
    console.log("database disconnected");
  });

app.get("/", (req, res) => {
  res.send("Server is up and running on PORT 5000");
});
app.use(userRoutes);
app.use(authRoutes);
app.use(blogsRoutes);
server.listen(PORT);
