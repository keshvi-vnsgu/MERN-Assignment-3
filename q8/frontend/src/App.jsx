import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const API_BASE_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Fetch all students from Express backend
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      const resData = await response.json();
      if (resData.success) {
        setStudents(resData.data);
      } else {
        showAlert('error', resData.message || 'Failed to load students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      showAlert('error', 'Cannot connect to backend server. Make sure server is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 4000);
  };

  // Create or Update student
  const handleFormSubmit = async (formData) => {
    try {
      if (currentStudent) {
        // UPDATE operation
        const response = await fetch(`${API_BASE_URL}/${currentStudent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const resData = await response.json();

        if (response.ok && resData.success) {
          showAlert('success', 'Student details updated successfully!');
          setCurrentStudent(null);
          fetchStudents();
        } else {
          showAlert('error', resData.message || 'Failed to update student');
        }
      } else {
        // CREATE operation
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const resData = await response.json();

        if (response.ok && resData.success) {
          showAlert('success', 'Student added successfully!');
          fetchStudents();
        } else {
          showAlert('error', resData.message || 'Failed to add student');
        }
      }
    } catch (error) {
      console.error('Error saving student:', error);
      showAlert('error', 'Failed to communicate with server');
    }
  };

  // Delete student
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete student "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      const resData = await response.json();

      if (response.ok && resData.success) {
        showAlert('success', `Student "${name}" deleted successfully.`);
        if (currentStudent && currentStudent.id === id) {
          setCurrentStudent(null);
        }
        fetchStudents();
      } else {
        showAlert('error', resData.message || 'Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      showAlert('error', 'Failed to connect to server during deletion');
    }
  };

  const handleEditClick = (student) => {
    setCurrentStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setCurrentStudent(null);
  };

  return (
    <div className="container">
      <header>
        <div>
          <h1>Student Management System</h1>
        </div>
      </header>

      {alert.message && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}

      <StudentForm
        currentStudent={currentStudent}
        onSubmit={handleFormSubmit}
        onCancel={handleCancelEdit}
      />

      <StudentList
        students={students}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default App;
