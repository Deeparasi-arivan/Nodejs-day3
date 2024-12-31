const express = require('express');
const studentController = require('../controllers/studentController');
const router = express.Router();

router.post('/', studentController.createStudent); // POST /students
router.get('/no-mentor', studentController.getStudentsWithoutMentor); // GET /students/no-mentor
router.put('/:id/mentor', studentController.changeMentor); // PUT /students/:id/mentor
router.get('/:id/mentor', studentController.getMentorForStudent); // GET /students/:id/mentor

module.exports = router;