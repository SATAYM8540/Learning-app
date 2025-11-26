



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const load = async () => {
      const { data: courseData } = await api.get("/courses");
      setCourses(courseData);

      const { data: enrollData } = await api.get(
        "/courses/me/enrollments/list"
      );
      setEnrollments(enrollData);
    };
    load();
  }, []);

  const handleLogout = async () => {
    await api.post("/auth/logout");
    localStorage.clear();
    navigate("/");
  };

  const enrolledIds = new Set(enrollments.map((e) => e.course._id));

  return (
    <>
      {/* HEADER */}
      <header
        style={{
          background: "linear-gradient(90deg,#020617,#0f172a)",
          color: "#e5e7eb",
          padding: "0.8rem 1.8rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(15,23,42,0.6)",
          position: "sticky",
          top: 0,
          zIndex: 20
        }}
      >
        {/* LEFT: logo + platform name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer"
          }}
          onClick={() => navigate("/")}
        >
          <div
            style={{
              background: "#2563eb",
              width: 32,
              height: 32,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 14
            }}
          >
            CS
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>CodingSikho</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>Dashboard</div>
          </div>
        </div>

        {/* RIGHT: Add Courses (admin), Certificates, Logout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            fontSize: 14
          }}
        >
          {(user.role === "admin" || user.role === "supervisor") && (
            <Link
              to="/admin"
              style={{ color: "#e5e7eb", textDecoration: "none" }}
            >
              Add Courses
            </Link>
          )}

          <Link
            to="/certificates"
            style={{ color: "#e5e7eb", textDecoration: "none" }}
          >
            Certificates
          </Link>

          <button
            onClick={handleLogout}
            style={{
              background: "#f97316",
              border: "none",
              padding: "0.4rem 0.9rem",
              borderRadius: 999,
              color: "#111827",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 13
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* BODY */}
      <div
        style={{
          maxWidth: 1100,
          margin: "1.5rem auto",
          padding: "0 1rem 2rem",
          minHeight: "calc(100vh - 70px)"
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Available Courses</h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))"
          }}
        >
          {courses.map((c) => (
            <div
              key={c._id}
              style={{
                background: "#fff",
                padding: "1rem",
                borderRadius: "0.9rem",
                boxShadow: "0 4px 12px rgba(15,23,42,0.08)"
              }}
            >
              <h3>{c.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                {c.category}
              </p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>
                {c.description}
              </p>
              <div
                style={{
                  marginTop: "0.85rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Link to={`/courses/${c._id}`}>View</Link>
                {enrolledIds.has(c._id) && (
                  <span
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.15rem 0.6rem",
                      borderRadius: 999,
                      background: "#ecfdf5",
                      color: "#15803d"
                    }}
                  >
                    Enrolled
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
