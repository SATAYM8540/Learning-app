

import { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../assets/css/admin.css"; // ⬅️ make sure this file exists

export default function AdminPanelPage() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    youtubeUrl: "",
  });

  const loadCourses = async () => {
    const { data } = await api.get("/courses");
    setCourses(data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await api.post("/courses", form);
    setForm({ title: "", description: "", category: "", youtubeUrl: "" });
    loadCourses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/courses/${id}`);
    loadCourses();
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-title">Add Course</h2>

      {/* CREATE COURSE FORM */}
      <section className="admin-section">
        <h3>Create Course</h3>
        <form onSubmit={handleCreate} className="admin-form">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            placeholder="Category (Java, Python...)"
            value={form.category}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, category: e.target.value }))
            }
          />
          <input
            placeholder="YouTube URL"
            value={form.youtubeUrl}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, youtubeUrl: e.target.value }))
            }
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <button type="submit">Create</button>
        </form>
      </section>

      {/* COURSES AS CARDS */}
      <section className="admin-section">
        <h3>Courses</h3>

        <div className="admin-course-card-container">
          {courses.map((c) => (
            <div className="admin-course-card" key={c._id}>
              <p className="course-category">{c.category}</p>

              <h4 className="course-title">{c.title}</h4>

              <p className="course-description">
                {c.description?.slice(0, 90)}
                {c.description && c.description.length > 90 ? "..." : ""}
              </p>

              <button
                className="delete-btn"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
