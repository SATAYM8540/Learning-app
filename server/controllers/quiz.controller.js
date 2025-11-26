import Quiz from "../models/Quiz.js";

export const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: "Error creating quiz" });
  }
};

export const getQuizByCourse = async (req, res) => {
  const quiz = await Quiz.findOne({ course: req.params.courseId });
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });
  res.json(quiz);
};
