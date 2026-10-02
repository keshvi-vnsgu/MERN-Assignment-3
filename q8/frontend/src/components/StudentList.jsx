import React, { useState } from 'react';

const StudentList = ({ students, onEdit, onDelete, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(term) ||
      student.rollNo.toString().toLowerCase().includes(term) ||
      student.email.toLowerCase().includes(term) ||
      student.course.toLowerCase().includes(term)
    );
  });

  return (
    <div className="table-section">
      <h2>Student Directory ({students.length})</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, roll no, email, course..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="no-data">Loading student records...</div>
      ) : filteredStudents.length === 0 ? (
        <div className="no-data">
          {searchTerm ? 'No matching student records found.' : 'No students registered yet.'}
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Roll No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td><strong>{student.rollNo}</strong></td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.age}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => onDelete(student.id, student.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
