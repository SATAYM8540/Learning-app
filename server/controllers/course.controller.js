import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const getCourses = async (req, res) => {
  const courses = await Course.find({ isPublished: true });
  res.json(courses);
};

export const getCourseById = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.status(404).json({ message: "Course not found" });
  res.json(course);
};

export const enrollInCourse = async (req, res) => {
  const studentId = req.user.id;
  const courseId = req.params.id;
  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      { student: studentId, course: courseId },
      { student: studentId, course: courseId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: "Enrollment error" });
  }
};

export const getMyEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user.id }).populate(
    "course"
  );
  res.json(enrollments);
};

// admin
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, youtubeUrl } = req.body;
    const course = await Course.create({
      title,
      description,
      category,
      youtubeUrl
    });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Error updating course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting course" });
  }
};
