const express = require("express");
const {
  addNewTask,
  markCompeted,
  getSortedTasks,
  changePriority,
  changeCategory,
} = require("./Controller");

const app = express();
const port = 3000;

app.use(express.json());

// routes
app.post("/new", addNewTask);
app.put("/markComplete/:id", markCompeted);
app.get("/getSorted/:sortBy", getSortedTasks);
app.put("/changePriority/:id", changePriority);
app.put("/changeCategory/:id", changeCategory);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
