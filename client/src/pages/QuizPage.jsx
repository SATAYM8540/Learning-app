import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function QuizPage() {
  const { courseId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get(`/quizzes/course/${courseId}`);
        setQuiz(data);
      } catch {
        setQuiz(null);
      }
    };
    load();
  }, [courseId]);

  const handleChange = (qId, value) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      quizId: quiz._id,
      answers: quiz.questions.map((q) => ({
        questionId: q._id,
        answer: q.type === "mcq" ? Number(answers[q._id]) : answers[q._id] || ""
      }))
    };
    const { data } = await api.post("/attempts/submit", payload);
    setResult(data);
  };

  if (!quiz) return <p style={{ padding: "1rem" }}>No quiz found yet.</p>;

  return (
    <div style={{ maxWidth: 900, margin: "1.5rem auto", padding: "0 1rem" }}>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <div
          key={q._id}
          style={{
            background: "#fff",
            padding: "1rem",
            borderRadius: "0.75rem",
            marginBottom: "1rem"
          }}
        >
          <p>
            <b>Q{idx + 1}.</b> {q.questionText}
          </p>
          {q.type === "mcq" ? (
            <div>
              {q.options.map((opt, i) => (
                <label key={i} style={{ display: "block", fontSize: "0.9rem" }}>
                  <input
                    type="radio"
                    name={q._id}
                    value={i}
                    checked={String(answers[q._id]) === String(i)}
                    onChange={(e) => handleChange(q._id, e.target.value)}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <textarea
              style={{ width: "100%", minHeight: "60px" }}
              value={answers[q._id] || ""}
              onChange={(e) => handleChange(q._id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit Quiz</button>

      {result && (
        <div
          style={{
            marginTop: "1rem",
            background: "#fff",
            padding: "1rem",
            borderRadius: "0.75rem"
          }}
        >
          <p>Score: {result.attempt.totalScore}</p>
          <p>Percentage: {result.percentage.toFixed(2)}%</p>
          <p>Status: {result.passed ? "Passed ✅" : "Failed ❌"}</p>
          {result.passed && <p>Certificate has been generated and saved.</p>}
        </div>
      )}
    </div>
  );
}
