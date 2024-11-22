import Database from "../Database/index.js";

// Find all assignments for a course
export function findAllAssignmentsForCourse(courseId) {
    const { assignments } = Database;
    return assignments.filter((assignment) => assignment.course === courseId);
}

// create assignments
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: Date.now().toString() };
    Database.assignments = [...Database.assignments, newAssignment];
    return newAssignment;
}

// delete assignments
export function deleteAssignment(assignmentId) {
    const { assignments } = Database;
    Database.assignments = assignments.filter((assignment) => assignment._id !== assignmentId);
}

// update assignments
export function updateAssignment(assignmentId, assignmentUpdates) {
    const { assignments } = Database;
    const assignment = assignments.find((assignment) => assignment._id === assignmentId);
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}