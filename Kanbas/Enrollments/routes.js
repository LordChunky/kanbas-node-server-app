import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";



export default function EnrollmentRoutes(app) {

    // get all enrollments
    app.get("/api/enrollments", (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.send(enrollments);
    });

    // enroll a student
    app.post("/api/enrollments/:courseId/enroll", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body;
        // check to see what course does the user enrolled in
        const enrolledCourse = courseDao.findEnrolledCourseForUser(courseId, userId);
        dao.enrollUserInCourse(userId, courseId);
        res.json(enrolledCourse);
    });

    // unenroll the student
    app.post("/api/enrollments/:courseId/unenroll", (req, res) => {
        const { courseId } = req.params;
        const { userId } = req.body;
        // check to see what course does the user enrolled in
        const enrolledCourse = courseDao.findEnrolledCourseForUser(courseId, userId);
        dao.unenrollUserInCourse(userId, courseId);
        res.json(enrolledCourse);
    });

}
