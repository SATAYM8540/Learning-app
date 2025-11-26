import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: Boolean,
        earnedPoints: Number
      }
    ],
    totalScore: Number,
    percentage: Number,
    passed: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("Attempt", attemptSchema);
