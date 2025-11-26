
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../assets/css/landing.css";

export default function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const { data } = await api.get("/courses");
        setCourses(data);
      } catch (err) {
        console.error("Error loading courses", err);
      }
    };
    loadCourses();
  }, []);

  const goToCourse = (id) => {
    navigate(`/courses/${id}`);
    setIsMenuOpen(false);
  };

  const scrollToCourses = () => {
    const el = document.getElementById("courses");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <div className="landing-root">
      {/* HEADER */}
      <header className="landing-header">
        <div className="header-inner">
          {/* LEFT: logo + nav */}
          <div className="header-left">
            <div className="logo-block" onClick={() => navigate("/")}>
              <span className="logo-icon">CS</span>
              <span className="logo-text">CodingSikho</span>
            </div>

            <nav className="header-nav">
           
              <button
             className="nav-btn"
                    onClick={() => {
                        navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                        >
                                Home
                                </button>


              <button className="nav-btn" onClick={scrollToCourses}>
                Courses
              </button>

              {/* New Practice button linking to LeetCode */}
              <button
                className="nav-btn"
                onClick={() => window.open("https://leetcode.com/", "_blank")}
              >
                Practice
              </button>
            </nav>
          </div>

          {/* RIGHT: auth buttons */}
          <div className="header-right">
            <Link to="/login" className="header-link">
              Login
            </Link>
            <Link to="/signup" className="header-cta">
              Signup
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-pill">Learn Coding with CodingSikho</div>

          <h1 className="hero-title">
            Grow your skills with
            <span> structured courses & quizzes</span>
          </h1>

          <p className="hero-subtitle">
            Learn coding through video lessons, attempt quizzes, track progress,
            and earn certificates—all in one platform.
          </p>

          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary">
              Already a student? Login
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-card">
            <img
              src="https://d3h2k7ug3o5pb3.cloudfront.net/image/2020-12-03/84256810-354d-11eb-be48-092568f6a231.jpg"
              alt="Student learning"
            />
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="section section-courses">
        <div className="section-header">
          <h2><b>Courses</b></h2>
          <p>Start courses and learning today.</p>
        </div>

        {courses.length === 0 ? (
          <p className="empty-text">
            No courses created yet. Login as admin to add some.
          </p>
        ) : (
          <div className="lp-course-card-container">
            {courses.map((course) => (
              <div
                key={course._id}
                className="lp-course-card"
                onClick={() => goToCourse(course._id)}
              >
                <p className="lp-course-category">{course.category}</p>

                <h3 className="lp-course-title">{course.title}</h3>

                <p className="lp-course-desc">
                  {course.description?.slice(0, 100)}...
                </p>

                <button
                  className="lp-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToCourse(course._id);
                  }}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-container">
          <h3 className="footer-logo">@CodingSikho</h3>

          <p className="footer-tagline">
            Your trusted online coding learning platform.
          </p>

          <div className="footer-location">📍 India, Rajasthan, Jaipur</div>

          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-facebook"></i>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} CodingSikho · All rights reserved
        </div>
      </footer>
    </div>
  );
} 

