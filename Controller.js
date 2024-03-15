// Dummy database to store tasks
let tasks = [];

// Route to create a new task
const addNewTask = (req, res) => {
  try {
    const { title, description, dueDate, category, priority } = req.body;

    const task = {
      id: tasks.length + 1,
      title,
      description,
      dueDate,
      category,
      priority,
      completed: false,
    };

    tasks.push(task);
    res.status(200).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", Error: error });
  }
};

// Route to mark a task as completed
const markCompeted = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
  } else {
    task.completed = true;
    res.status(200).json({ message: "Task marked as completed", task });
  }
};

// Route to get tasks sorted by due date, category, or completion status
const getSortedTasks = (req, res) => {
  let sortedTasks = tasks;

  const sortBy = req.params.sortBy;
  try {
    if (sortBy === "dueDate") {
      sortedTasks = tasks.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    } else if (sortBy === "category") {
      sortedTasks = tasks.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "completed") {
      sortedTasks = tasks.sort((a, b) => a.completed - b.completed);
    }

    res.status(200).json({ Tasks: sortedTasks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", Error: error });
  }
};

// route to change priority of a task
const changePriority = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      const { priority } = req.body;
      task.priority = priority;
      res.status(200).json({ message: "Task priority changed", task });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", Error: error });
  }
};

// route to change category of a task
const changeCategory = (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    } else {
      const { category } = req.body;
      task.category = category;
      res.status(200).json({ message: "Task category changed", task });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", Error: error });
  }
};

module.exports = {
  addNewTask,
  markCompeted,
  getSortedTasks,
  changePriority,
  changeCategory,
};
