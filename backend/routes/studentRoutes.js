const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Department = require('../models/department'); // <--- ADD THIS LINE HERE

// 1. GET DASHBOARD STATS
// Inside your routes file, add a console log to see if it's being hit
router.get('/dashboard-stats', async (req, res) => {
    try {
        // Fetch counts and recent students in parallel
        const [studentCount, deptCount, latestStudents] = await Promise.all([
            Student.countDocuments(),
            Department.countDocuments(),
            Student.find().sort({ createdAt: -1 }).limit(5) // Last 5 enrollments
        ]);

        res.json({
            totalStudents: studentCount,
            activeDepartments: deptCount,
            recentActivity: latestStudents
        });
    } catch (err) {
        res.status(500).json({ message: "Error calculating stats" });
    }
});

// 1. GET ALL STUDENTS
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. CREATE A STUDENT (POST)
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    course: req.body.course,
    status: req.body.status || 'Active'
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. UPDATE A STUDENT (PUT)
// This matches your frontend: this.http.put(`${this.apiUrl}/${id}`, student)
router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id, 
      {
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        status: req.body.status
      },
      { new: true } // This option returns the modified document rather than the original
    );
    
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. DELETE A STUDENT
router.delete('/:id', async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Student not found" });
    
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;