import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel"},
        title: String,
        description: String,
        points: String,
        due_at: String,
        available_day: String,
        until_day: String,
    },
    { collection: "assignments" }
);
export default assignmentSchema;