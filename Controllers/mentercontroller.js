const Mentor = require('../models/Mentor');

exports.createMentor = async (req, res) => {
  const { name, email } = req.body;
  try {
    const mentor = new Mentor({ name, email });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getStudentsForMentor = async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.find({ mentor: id });
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};








