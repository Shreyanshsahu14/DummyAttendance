import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons
import "./AttendanceApp.css";
import { logout } from "../services/operations/authAPI";

const AttendanceApp = () => {
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [theme, setTheme] = useState("light");
  const [date, setDate] = useState("");
  const [branch, setBranch] = useState("");
  const [students, setStudents] = useState([
    { name: "Akarsh Gupta", rollNo: "21E6001", present: false },
    { name: "Abhinav Ahirwar", rollNo: "21E6002", present: false },
    { name: "Aditya Gupta", rollNo: "21E6003", present: false },
    { name: "Agam Jain", rollNo: "21E6005", present: false },
    { name: "Akshat Jain", rollNo: "21E6006", present: false },
    { name: "Anshul Rathore", rollNo: "21E6007", present: false },
    { name: "Anushka Panse", rollNo: "21E6010", present: false },
    { name: "Arsha Mohania", rollNo: "21E6011", present: false },
    { name: "Aryan Vyas", rollNo: "21E6012", present: false },
    { name: "Ashish Solanki", rollNo: "21E6013", present: false },
    { name: "Ashwin Tiwari", rollNo: "21E6014", present: false },
    { name: "Atharv Patankar", rollNo: "21E6015", present: false },
    { name: "Ayush Sharma", rollNo: "21E6016", present: false },
    { name: "Bharat Surajvanshi", rollNo: "21E6017", present: false },
    { name: "Bhumika Patel", rollNo: "21E6018", present: false },
    { name: "Deepaksha Nain", rollNo: "21E6019", present: false },
    { name: "Dev Sharma", rollNo: "21E6020", present: false },
    { name: "Devansh Borgonkar", rollNo: "21E6021", present: false },
    { name: "Gajendra Singh Tomar", rollNo: "21E6022", present: false },
    { name: "Gaurav Kahar", rollNo: "21E6023", present: false },
    { name: "Gaurav Puri", rollNo: "21E6024", present: false },
    { name: "Hitesh Agrawal", rollNo: "21E6025", present: false },
    { name: "Hrithik Parashar", rollNo: "21E6026", present: false },
    { name: "Kristina Uikey", rollNo: "21E6027", present: false },
    { name: "Lekhan Chauhan", rollNo: "21E6028", present: false },
    { name: "Manraj Verma", rollNo: "21E6029", present: false },
    { name: "Md Sharique", rollNo: "21E6030", present: false },
    { name: "Neeraj Kartaria", rollNo: "21E6031", present: false },
    { name: "Nirbhay Srivastava", rollNo: "21E6032", present: false },
    { name: "Nirali Mothe", rollNo: "21E6033", present: false },
    { name: "Pradyumn Kumar Porwal", rollNo: "21E6034", present: false },
    { name: "Prachak Kayat", rollNo: "21E6035", present: false },
    { name: "Richa Laddhate", rollNo: "21E6036", present: false },
    { name: "Rishab Jain", rollNo: "21E6037", present: false },
    { name: "Ritik Sisodiya", rollNo: "21E6038", present: false },
    { name: "Ronak Bathia", rollNo: "21E6039", present: false },
    { name: "Sharath K Nair", rollNo: "21E6040", present: false },
    { name: "Shivang Shrivastava", rollNo: "21E6041", present: false },
    { name: "Shraddha Thakur", rollNo: "21E6042", present: false },
    { name: "Shreeyansh Shukla", rollNo: "21E6043", present: false },
    { name: "Somya Sanchoria", rollNo: "21E6044", present: false },
    { name: "Sourav Singh Jadon", rollNo: "21E6045", present: false },
    { name: "Soumya Bharti", rollNo: "21E6046", present: false },
    { name: "Sushrut Raj Thakur", rollNo: "21E6047", present: false },
    { name: "Tanushka Tripathi", rollNo: "21E6048", present: false },
    { name: "Tanya Singhal", rollNo: "21E6049", present: false },
    { name: "Vaishnavtee Aheer", rollNo: "21E6050", present: false },
    { name: "Vivek Singh Parihar", rollNo: "21E6051", present: false },
    { name: "Yogesh Chaurasiya", rollNo: "21E6052", present: false },
    { name: "Abhinav Singh", rollNo: "21E6053", present: false },
    { name: "Divyansh Jain", rollNo: "21E6054", present: false },
    { name: "Nitin Panchal", rollNo: "21E6055", present: false },
    { name: "Samyak Jain", rollNo: "21E6056", present: false },
    { name: "Sarthak Jategaonkar", rollNo: "21E6057", present: false },
    { name: "Depresh Aishwarya", rollNo: "21E6058", present: false },
    { name: "Shruti Kardam", rollNo: "21E6059", present: false },
    { name: "Ayush Kumar", rollNo: "22E6060", present: false },
    { name: "Abhishek Solanki", rollNo: "22E6061", present: false },
    { name: "Narottam Nayak", rollNo: "22E6062", present: false },
  ]);

  const [errorMessages, setErrorMessages] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false); // New state to control student list visibility

  const sessionClasses = {
    "Semester 1": ["AMR2C1", "APR2C2", "MER2C3", "EIR2C4", "COR2C5", "SSR2S2"],
    "Semester 2": ["AMR1C1", "ACR1C2", "MER1C3", "ETR1C4", "MER1C5", "SSR1S1"],
    "Semester 3": ["3AERC1", "3EIRC2", "3EIRC3", "3EIRC4", "3EIRG1", "3SERS3"],
    "Semester 4": ["4EIRC1", "4EIRC2", "4EIRC3", "4EIRC4", "4EIRG2", "4SERS4"],
    "Semester 5": ["5EIRC1", "5EIRC2", "5EIRC3", "5EIRE1", "5EIRE5", "5SERS5"],
    "Semester 6": ["6EIRC1", "6EIRC2", "6EIRC3", "6EIRE1", "6EIRG4", "6SERS6"],
    "Semester 7": ["7EIRC1", "7EIRC2", "7EIRC3", "7EIRE1"],
  };

  const branches = [
    "Computer Science",
    "Information Technology",
    "Electronics & Instrumentation",
    "Electronics & Telecommunication",
    "Mechanical",
    "Civil",
  ];
  const [availableClasses, setAvailableClasses] = useState([]);

  const navigate = useNavigate();

  const handleSessionChange = (event) => {
    const session = event.target.value;
    setSelectedSession(session);
    setAvailableClasses(sessionClasses[session] || []);
    setSelectedClass("");
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
  };

  const toggleAttendance = (rollNo) => {
    setStudents(
      students.map((student) =>
        student.rollNo === rollNo ? { ...student, present: !student.present } : student
      )
    );
  };

  const removeStudent = (rollNo) => {
    setStudents(students.filter((student) => student.rollNo !== rollNo));
  };

  const addStudent = () => {
    const newRollNo = prompt("Enter student roll number:");
    const newStudent = {
      name: prompt("Enter student name:"),
      rollNo: newRollNo,
      present: false,
    };
    setStudents([...students, newStudent]);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedSession) errors.selectedSession = "Please select a session.";
    if (!selectedClass) errors.selectedClass = "Please select a class.";
    if (!date) errors.date = "Please select a date.";
    if (!branch) errors.branch = "Please select a branch.";
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsFormValid(true);
      setShowStudentList(true); // Show student list upon successful submission
    } else {
      setIsFormValid(false);
      setShowStudentList(false); // Hide student list if the form is invalid
    }
  };

  return (
    <div className={`attendance-app ${theme}`}>
      <header>
        <h1>Attendance App</h1>
        <div className="header-actions">
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </header>

      <div className="date-selector">
        <label>Select Date:</label>
        <input type="date" value={date} onChange={handleDateChange} />
        {errorMessages.date && <p className="error-message">{errorMessages.date}</p>}
      </div>

      <div className="branch-selector">
        <label>Branch:</label>
        <select value={branch} onChange={handleBranchChange}>
          <option value="">Select Branch</option>
          {branches.map((branchOption) => (
            <option key={branchOption} value={branchOption}>
              {branchOption}
            </option>
          ))}
        </select>
        {errorMessages.branch && <p className="error-message">{errorMessages.branch}</p>}
      </div>

      <div className="session-selector">
        <label>Semester:</label>
        <select value={selectedSession} onChange={handleSessionChange}>
          <option value="">Select Semester</option>
          {Object.keys(sessionClasses).map((session) => (
            <option key={session} value={session}>
              {session}
            </option>
          ))}
        </select>
        {errorMessages.selectedSession && <p className="error-message">{errorMessages.selectedSession}</p>}
      </div>

      {availableClasses.length > 0 && (
        <div className="class-selector">
          {availableClasses.map((className) => (
            <button key={className} onClick={() => handleClassChange(className)}>
              {className}
            </button>
          ))}
        </div>
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {showStudentList && isFormValid && selectedClass && ( // Show student list based on new state
        <div className="student-list">
          <h2>
            {selectedClass} - {selectedSession}
          </h2>
          {students.map((student) => (
            <div key={student.rollNo} className="student">
              <div className="student-info">
                <p className="roll-no">{student.rollNo}</p>
                <p className="name">{student.name}</p>
                <div className="attendance-controls">
                  <input
                    type="checkbox"
                    checked={student.present}
                    onChange={() => toggleAttendance(student.rollNo)}
                    className="attendance-checkbox"
                  />
                  <button className="remove-student" onClick={() => removeStudent(student.rollNo)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="add-student-btn" onClick={addStudent}>
            Add Student
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceApp;
