import model from "./model.js";

export function findAllCourses() {
    return model.find();
}

// export function findCoursesForEnrolledUser(userId) {
//     const { courses, enrollments } = Database;
//     const enrolledCourses = courses.filter((course) =>
//         enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
//     return enrolledCourses;
// }

export function createCourse(course) {
    delete course._id;
    return model.create(course);
}

export function deleteCourse(courseId) {
    return model.deleteOne({ _id: courseId }); 
}
   

export function updateCourse(courseId, courseUpdates) {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}

// Find the course that the user already enrolled in using the course id and user id to filter
export function findEnrolledCourseForUser(courseId, userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.find((course) => course._id === courseId &&
        enrollments.some((enrollment) => enrollment.course === course._id && enrollment.user === userId ));
    return enrolledCourses;
}
  

