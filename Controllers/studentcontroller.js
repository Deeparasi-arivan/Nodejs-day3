const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

exports.createStudent = async (req, res) => {
  const { name, email } = req.body;
  try {
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentsWithoutMentor = async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.changeMentor = async (req, res) => {
  const { id } = req.params;
  const { mentorId } = req.body;
  
  try {
    const student = await Student.findById(id);
    student.mentor = mentorId;
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMentorForStudent = async (req, res) => {
  const { id } = req.params;
  
  try {
    const student = await Student.findById(id).populate('mentor');
    if (student && student.mentor) {
      res.status(200).json(student.mentor);
    } else {
      res.status(404).json({ message: 'Mentor not found for this student' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};