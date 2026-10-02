const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Student = require('./models/student.model');
const studentRoutes = require('./routes/student.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Student Management API (Sequelize + Express) is running' });
});

// Sync database and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Sync models (creates tables if they don't exist)
    await sequelize.sync({ force: false });
    console.log('Sequelize models synchronized with database.');

    // Seed initial dummy data if table is empty
    const count = await Student.count();
    if (count === 0) {
      await Student.bulkCreate([
        { name: 'Rahul Sharma', rollNo: '101', email: 'rahul@example.com', course: 'Computer Science', age: 21 },
        { name: 'Priya Patel', rollNo: '102', email: 'priya@example.com', course: 'Information Technology', age: 20 },
        { name: 'Amit Kumar', rollNo: '103', email: 'amit@example.com', course: 'Electronics', age: 22 }
      ]);
      console.log('Initial sample students seeded successfully.');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
