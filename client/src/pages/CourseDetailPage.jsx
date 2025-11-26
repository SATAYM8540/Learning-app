import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get(`/courses/${courseId}`);
      setCourse(data);

      const { data: enrollments } = await api.get(
        "/courses/me/enrollments/list"
      );
      setIsEnrolled(enrollments.some((e) => e.course._id === courseId));
    };
    load();
  }, [courseId]);

  const enroll = async () => {
    await api.post(`/courses/${courseId}/enroll`);
    setIsEnrolled(true);
  };

  if (!course) return <p style={{ padding: "1rem" }}>Loading...</p>;

  const youTubeId =
    course.youtubeUrl.split("v=")[1]?.split("&")[0] || "";

  return (
    <div style={{ maxWidth: 900, margin: "1.5rem auto", padding: "0 1rem" }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Category: {course.category}</p>

      <div style={{ margin: "1rem 0" }}>
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            title="Course video"
            src={`https://www.youtube.com/embed/${youTubeId}`}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none"
            }}
            allowFullScreen
          />
        </div>
      </div>

      {!isEnrolled ? (
        <button onClick={enroll}>Enroll</button>
      ) : (
        <Link to={`/courses/${courseId}/quiz`}>
          <button>Take Quiz</button>
        </Link>
      )}
    </div>
  );
}
