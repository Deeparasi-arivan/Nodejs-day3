const express = require('express');
const mentorController = require('../controllers/mentorController');
const router = express.Router();

router.post('/', mentorController.createMentor); // POST /mentors
router.get('/:id/students', mentorController.getStudentsForMentor); // GET /mentors/:id/students

module.exports = router;