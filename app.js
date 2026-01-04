import express from 'express';
import connectToMongo from './db.js';
import { PORT } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';


const app = express();

connectToMongo();

// Middleware
app.use(express.json());   
app.use(express.urlencoded({ extended: true }));


// CORS headers (simple implementation)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Routes
app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)




app.get("/", (req, res) => {
  console.log("Hello this is Home route...")
})

// Error handler (It must be written at last)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})