import React, { useState, useEffect } from 'react';

const StudentForm = ({ currentStudent, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    course: '',
    age: ''
  });

  useEffect(() => {
    if (currentStudent) {
      setFormData({
        name: currentStudent.name || '',
        rollNo: currentStudent.rollNo || '',
        email: currentStudent.email || '',
        course: currentStudent.course || '',
        age: currentStudent.age || ''
      });
    } else {
      setFormData({
        name: '',
        rollNo: '',
        email: '',
        course: '',
        age: ''
      });
    }
  }, [currentStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo || !formData.email || !formData.course || !formData.age) {
      alert('Please fill out all fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="form-card">
      <h2>{currentStudent ? 'Edit Student Details' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNo"
              placeholder="e.g. 101"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. rahul@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <input
              type="text"
              name="course"
              placeholder="e.g. Computer Science"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="e.g. 21"
              value={formData.age}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {currentStudent ? 'Update Student' : 'Save Student'}
          </button>
          {currentStudent && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
