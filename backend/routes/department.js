const express = require('express');
const router = express.Router();
const Department = require('../models/department');

// 1. GET all departments
router.get('/', async (req, res) => {
    try {
        const depts = await Department.find().sort({ name: 1 }); // Sort A-Z
        res.json(depts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. POST create a new department
router.post('/', async (req, res) => {
    const dept = new Department({
        name: req.body.name
    });

    try {
        const newDept = await dept.save();
        res.status(201).json(newDept);
    } catch (err) {
        res.status(400).json({ message: "Department already exists or invalid data" });
    }
});

// 3. DELETE a department
router.delete('/:id', async (req, res) => {
    try {
        await Department.findByIdAndDelete(req.params.id);
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;