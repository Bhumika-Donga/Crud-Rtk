import express from 'express';
import cors from 'cors';

const app = express();
const port = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for tasks (replace with a database in production)
let tasks = [];
let taskIdCounter = 1;

// API Routes
app.get('/api/v1/users/allTasks', (req, res) => {
  res.json({
    statusMessage: "Tasks fetched successfully",
    statusCode: 200,
    response: {
      tasks: tasks
    }
  });
});

app.post('/api/v1/users/tasks', (req, res) => {
  const task = {
    _id: String(taskIdCounter++),
    ...req.body
  };
  tasks.push(task);
  res.json({
    statusMessage: "Task created successfully",
    statusCode: 200,
    response: {
      task
    }
  });
});

app.put('/api/v1/users/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(t => t._id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      statusMessage: "Task not found",
      statusCode: 404
    });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...req.body
  };

  res.json({
    statusMessage: "Task updated successfully",
    statusCode: 200,
    response: {
      task: tasks[taskIndex]
    }
  });
});

app.delete('/api/v1/users/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(t => t._id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      statusMessage: "Task not found",
      statusCode: 404
    });
  }

  tasks = tasks.filter(t => t._id !== taskId);

  res.json({
    statusMessage: "Task deleted successfully",
    statusCode: 200
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 