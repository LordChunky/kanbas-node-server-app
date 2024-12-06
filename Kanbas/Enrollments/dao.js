import model from "./model.js";

// Find all of the enrollments
export async function findAllEnrollments() {
    return await model.find();
}

// Given a particular user we would like to determine which courses are related to that user, 
// e.g., which courses is a user enrolled in. This function does that
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}

// find users that enrolled in a course
// This is mostly for the People Table
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}

// enroll user
export function enrollUserInCourse(user, course) {
    return model.create({ user, course });
}
   

// unenroll user
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}
   
