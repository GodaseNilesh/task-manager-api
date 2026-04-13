const express = require("express");
const app = express();

app.use(express.json());

//routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;
