const Course = require("../models/Course");

exports.copyStudentsFromPreviousSession = async (req, res) => {
    const { previousSessionId, newSessionId } = req.body;
    
    try {
      const previousCourses = await Course.find({ session: previousSessionId });
      
      for (const course of previousCourses) {
        const newCourse = new Course({
          course_id: course.course_id,
          course_name: course.course_name,
          enrolled_Students: course.enrolled_Students, // Copy students
          professor: course.professor,
          semester: course.semester,
          credit: course.credit,
          session: newSessionId // Link to the new session
        });
        await newCourse.save();
      }

      return res.status(200).json({
        success: true,
        message: "Students copied to new session successfully"
      });
    } catch (error) {
      console.error("Error copying students:", error);
      return res.status(500).json({
        success: false,
        message: "Error copying students"
      });
    }
  };

    // import React from 'react';

    // // Function to convert JSON to CSV format
    // const convertToCSV = (data) => {
    //   const headers = Object.keys(data[0]); // Extract the headers
    //   const rows = data.map(obj => headers.map(header => obj[header])); // Extract rows
    //   const csv = [headers, ...rows].map(row => row.join(',')).join('\n'); // Format as CSV
    //   return csv;
    // };
    
    // // Function to download CSV
    // const downloadCSV = (data, filename = 'export.csv') => {
    //   const csv = convertToCSV(data);
    //   const blob = new Blob([csv], { type: 'text/csv' });
    //   const url = window.URL.createObjectURL(blob);
    
    //   const link = document.createElement('a');
    //   link.href = url;
    //   link.download = filename;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // };
    
    // // React Component
    // const ExportCSV = () => {
    //   // Sample data to export
    //   const data = [
    //     { name: 'John Doe', age: 25, course: 'B.Tech' },
    //     { name: 'Jane Smith', age: 22, course: 'B.Tech' },
    //     { name: 'Sam Green', age: 24, course: 'B.Tech' },
    //   ];
    
    //   // Button to trigger CSV download
    //   return (
    //     <div>
    //       <h2>Export Data to CSV</h2>
    //       <button onClick={() => downloadCSV(data, 'students.csv')}>
    //         Download CSV
    //       </button>
    //     </div>
    //   );
    // };
    
    // export default ExportCSV;
    

  