import Database from "../Database/index.js";

// Find all enrollments
export function findAllEnrollments() {
    return Database.enrollments;
}

// enroll a user into a course
export function enrollUserInCourse(userId, courseId) {
    Database.enrollments = [...Database.enrollments, { _id: Date.now(), user: userId, course: courseId }]
}

// unenroll a user out of a course
export function unenrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    Database.enrollments = enrollments.filter((enrollment) => enrollment.user !== userId || enrollment.course !== courseId);
}
