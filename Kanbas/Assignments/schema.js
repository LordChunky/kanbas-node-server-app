import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel"},
        title: String,
        description: String,
        points: String,
        due_at: Date,
        available_day: Date,
        until_day: Date,
    },
    { collection: "assignments" }
);
export default assignmentSchema;