const Attendance = require("../models/Attendance");

exports.toggleAttendance = async (req, res) => {
  const { sessionId, courseId, studentId } = req.body;

  if (!sessionId) {
    return res.status(403).send({
      success: false,
      message: "Invalid Session Id",
    });
  }
  if (!courseId) {
    return res.status(403).send({
      success: false,
      message: "Invalid Course Id",
    });
  }
  if (!studentId) {
    return res.status(403).send({
      success: false,
      message: "Invalid Student Id",
    });
  }

  try {
    let attendance = await Attendance.findOne({
      session: sessionId,
      course: courseId,
      student: studentId,
    });

    if (!attendance) {
      attendance = await Attendance.create({
        session: sessionId,
        course: courseId,
        student: studentId,
        status: true,
        marked_by: req.user.id,
      });
    } else {
      attendance.status = !attendance.status; // toggle attendance
      await attendance.save();
    }

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    console.error("Error toggling attendance:", error);
    return res.status(500).json({
      success: false,
      message: "Error toggling attendance",
    });
  }
};
