import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API');
});

// Routes
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
