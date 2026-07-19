const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const mongoose = require('mongoose');

// Utility to check if string is valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// @route   GET /api/students
// @desc    Get all students (with search and filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, department, class: classFilter } = req.query;
    const filter = {};

    // Apply Search (fullName or studentId)
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    // Apply Department filter
    if (department && department !== 'All') {
      filter.department = department;
    }

    // Apply Class filter
    if (classFilter && classFilter !== 'All') {
      filter.class = classFilter;
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error while fetching students.' });
  }
});

// @route   GET /api/students/:id
// @desc    Get single student by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let student;

    if (isValidObjectId(id)) {
      student = await Student.findById(id);
    } else {
      // Fallback search by studentId field if it's not a valid Mongoose _id
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error while fetching student details.' });
  }
});

// @route   POST /api/students
// @desc    Create a new student
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { studentId, fullName, email, phone, department, class: classVal, address, dateOfBirth, gender, admissionDate } = req.body;

    // Check if studentId already exists
    const studentIdExists = await Student.findOne({ studentId });
    if (studentIdExists) {
      return res.status(400).json({ message: 'Student ID already exists.' });
    }

    // Check if email already exists
    const emailExists = await Student.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email address already registered.' });
    }

    const newStudent = new Student({
      studentId,
      fullName,
      email,
      phone,
      department,
      class: classVal,
      address,
      dateOfBirth,
      gender,
      admissionDate: admissionDate || undefined
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while saving student.' });
  }
});

// @route   PUT /api/students/:id
// @desc    Update an existing student
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, fullName, email, phone, department, class: classVal, address, dateOfBirth, gender, admissionDate } = req.body;

    let student;
    if (isValidObjectId(id)) {
      student = await Student.findById(id);
    } else {
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // Check if updating studentId and it collides with another student
    if (studentId && studentId !== student.studentId) {
      const studentIdExists = await Student.findOne({ studentId });
      if (studentIdExists) {
        return res.status(400).json({ message: 'Student ID already exists.' });
      }
      student.studentId = studentId;
    }

    // Check if updating email and it collides with another student
    if (email && email.toLowerCase() !== student.email.toLowerCase()) {
      const emailExists = await Student.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email address already registered.' });
      }
      student.email = email;
    }

    // Update other fields
    if (fullName) student.fullName = fullName;
    if (phone) student.phone = phone;
    if (department) student.department = department;
    if (classVal) student.class = classVal;
    if (address !== undefined) student.address = address;
    if (dateOfBirth) student.dateOfBirth = dateOfBirth;
    if (gender) student.gender = gender;
    if (admissionDate) student.admissionDate = admissionDate;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error while updating student.' });
  }
});

// @route   DELETE /api/students/:id
// @desc    Delete a student
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let result;

    if (isValidObjectId(id)) {
      result = await Student.findByIdAndDelete(id);
    } else {
      result = await Student.findOneAndDelete({ studentId: id });
    }

    if (!result) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Server error while deleting student.' });
  }
});

module.exports = router;
