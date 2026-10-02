const Student = require('../models/student.model');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: error.message
    });
  }
};

// Get single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student details',
      error: error.message
    });
  }
};

// Create new student
exports.createStudent = async (req, res) => {
  try {
    const { name, rollNo, email, course, age } = req.body;

    // Check if roll number already exists
    const existingStudent = await Student.findOne({ where: { rollNo } });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this Roll Number already exists.'
      });
    }

    const newStudent = await Student.create({
      name,
      rollNo,
      email,
      course,
      age: parseInt(age, 10)
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: newStudent
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create student'
    });
  }
};

// Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rollNo, email, course, age } = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    // Check roll number uniqueness if changed
    if (rollNo && rollNo !== student.rollNo) {
      const existing = await Student.findOne({ where: { rollNo } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another student with this Roll Number already exists.'
        });
      }
    }

    await student.update({
      name: name !== undefined ? name : student.name,
      rollNo: rollNo !== undefined ? rollNo : student.rollNo,
      email: email !== undefined ? email : student.email,
      course: course !== undefined ? course : student.course,
      age: age !== undefined ? parseInt(age, 10) : student.age
    });

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update student'
    });
  }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    await student.destroy();

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete student',
      error: error.message
    });
  }
};
