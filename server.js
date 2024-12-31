const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const connectDB = require('./utils/db');
const config = require('./config/config');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Use routes
app.use('/mentors', mentorRoutes);
app.use('/students', studentRoutes);

// Start the server
const port = config.port;
app.listen(port, () => console.log(`Server running on port ${port}`));

const Mentor = require('./models/Mentor');

// Create Mentor
app.post('/mentors', async (req, res) => {
  const { name, email } = req.body;
  try {
    const mentor = new Mentor({ name, email });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


const Student = require('./models/Student');

// Create Student
app.post('/students', async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/mentors/:id/students', async (req, res) => {
    const { id } = req.params;
    try {
      const students = await Student.find({ mentor: id });
      res.status(200).json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


  app.get('/students/no-mentor', async (req, res) => {
    try {
      const students = await Student.find({ mentor: null });
      res.status(200).json(students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  