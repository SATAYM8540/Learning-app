import Quiz from "../models/Quiz.js";
import Attempt from "../models/Attempt.js";
import Enrollment from "../models/Enrollment.js";
import { generateCertificateForStudent } from "../utils/certificate.js";

export const submitAttempt = async (req, res) => {
  const studentId = req.user.id;
  const { quizId, answers } = req.body;

  const quiz = await Quiz.findById(quizId).populate("course");
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  let totalPossible = 0;
  let totalEarned = 0;
  const answersResult = [];

  for (const q of quiz.questions) {
    const userAnswer = answers.find((a) => a.questionId === q._id.toString());
    const weight = q.weight || 1;
    totalPossible += weight;

    let isCorrect = false;
    if (q.type === "mcq") {
      isCorrect = userAnswer?.answer === q.correctOptionIndex;
    } else {
      isCorrect =
        userAnswer?.answer?.trim().toLowerCase() ===
        q.correctAnswerText.trim().toLowerCase();
    }

    const earned = isCorrect ? weight : 0;
    totalEarned += earned;

    answersResult.push({
      questionId: q._id,
      answer: userAnswer?.answer,
      isCorrect,
      earnedPoints: earned
    });
  }

  const percentage = (totalEarned / totalPossible) * 100;
  const passed = percentage >= quiz.passPercentage;

  const attempt = await Attempt.create({
    student: studentId,
    quiz: quiz._id,
    course: quiz.course._id,
    answers: answersResult,
    totalScore: totalEarned,
    percentage,
    passed
  });

  if (passed) {
    await Enrollment.findOneAndUpdate(
      { student: studentId, course: quiz.course._id },
      { status: "completed" }
    );

    await generateCertificateForStudent(studentId, quiz.course._id, null);
  }

  res.json({ attempt, passed, percentage });
};

export const getMyAttempts = async (req, res) => {
  const attempts = await Attempt.find({ student: req.user.id })
    .populate("quiz")
    .populate("course");
  res.json(attempts);
};
