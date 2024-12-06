// import Database from "../Database/index.js";
import model from "./model.js";

// Find all assignments for a course
export function findAllAssignmentsForCourse(courseId) {
    return model.find({course: courseId});
}

// create assignments
export function createAssignment(assignment) {
    console.log(assignment)
    delete assignment._id
    console.log(assignment)
    return model.create(assignment);
}

// delete assignments
export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}

// update assignments
export function updateAssignment(assignmentId, assignmentUpdates) {
    return model.updateOne({ _id: assignmentId }, assignmentUpdates);
}