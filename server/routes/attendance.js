const express=require("express");
const router=express.Router();
const {
toggleAttendance
}=require("../controllers/AttendanceController");
const {
    addCourse,
    editCourse,
}=require("../controllers/CourseController");

const {
    deleteStudent,
    createStudent,
    }=require("../controllers/StudentControllers");
const {
    getAllSessions,
    createNewSessions,
    createSessions,
    }=require("../controllers/SessionController");
const {
    copyStudentsFromPreviousSession
    }=require("../controllers/UtilityControllers");

    router.post("/addCourse",addCourse);
    router.post("/editCourse",editCourse);
    router.post("/deleteStudent",deleteStudent);
    router.post("/createStudent",createStudent);
    router.post("/createNewSessions",createNewSessions);
    // router.post("/createSessions",createSessions);
    router.post("/copyStudentsFromPreviousSession",copyStudentsFromPreviousSession);
    router.get("/getAllSessions",getAllSessions);
    router.post("/toggleAttendance",toggleAttendance);
    module.exports = router;