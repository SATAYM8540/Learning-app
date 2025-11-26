import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["mcq", "short"], required: true },
  questionText: { type: String, required: true },
  options: [String],              // for MCQ
  correctOptionIndex: Number,     // for MCQ
  correctAnswerText: String,      // for short
  weight: { type: Number, default: 1 }
});

const quizSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    title: { type: String, required: true },
    questions: [questionSchema],
    passPercentage: { type: Number, default: 75 }
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
