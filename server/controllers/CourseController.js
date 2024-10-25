const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  const { course_id, course_name, professor, semester, credit } = req.body;

  if (
    course_id.trim() == "" ||
    course_name.trim() == "" ||
    professor.trim() == "" ||
    !credit ||
    !semester.trim()
  ) {
    return res.status(403).send({
      success: false,
      message: "All Fields are required",
    });
  }

  try {
    const newCourse = await Course.create({
      course_id,
      course_name,
      professor,
      semester,
      credit,
    });

    if (!newCourse) {
      return res.status(403).send({
        success: false,
        message: "Try again! Cant create course.",
      });
    }

    return res.status(200).json({
      success: true,
      course: newCourse,
      message: "Course added successfully",
    });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({
      success: false,
      message: "Error adding course",
    });
  }
};

exports.editCourse = async (req, res) => {
  const { courseId } = req.params;
  const { course_name, semester, enrolled_branch } = req.body;

  try {
    const existingCourse = await Course.findById(courseId);

    if (existingCourse) {
      existingCourse.course_name = course_name || existingCourse.course_name;
      existingCourse.semester = semester || existingCourse.semester;
      existingCourse.enrolled_branch =
        enrolled_branch || existingCourse.enrolled_branch;
      await existingCourse.save();

      return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course: existingCourse,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
  } catch (error) {
    console.error("Error editing course:", error);
    return res.status(500).json({
      success: false,
      message: "Error editing course",
    });
  }
};
