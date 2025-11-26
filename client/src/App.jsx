

// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import DashboardPage from "./pages/DashboardPage";
// import CourseDetailPage from "./pages/CourseDetailPage";
// import QuizPage from "./pages/QuizPage";
// import CertificatesPage from "./pages/CertificatesPage";
// import AdminPanelPage from "./pages/admin/AdminPanelPage";

// import VisitorPopup from "./components/VisitorPopup";
// import CookieBanner from "./components/CookieBanner";

// const PrivateRoute = ({ children }) => {
//   const token = localStorage.getItem("accessToken");
//   const location = useLocation();
//   if (!token) return <Navigate to="/login" state={{ from: location }} />;
//   return children;
// };

// function App() {
//   return (
//     <>
//       {/* Popup after 2 minutes for registration */}
//       <VisitorPopup />

//       {/* Cookie consent banner with Accept / Decline */}
//       <CookieBanner />

//       <Routes>
//         {/* Public landing page */}
//         <Route path="/" element={<LandingPage />} />

//         {/* Auth */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* Protected pages */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <DashboardPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/courses/:courseId"
//           element={
//             <PrivateRoute>
//               <CourseDetailPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/courses/:courseId/quiz"
//           element={
//             <PrivateRoute>
//               <QuizPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/certificates"
//           element={
//             <PrivateRoute>
//               <CertificatesPage />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <PrivateRoute>
//               <AdminPanelPage />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;



import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import QuizPage from "./pages/QuizPage";
import CertificatesPage from "./pages/CertificatesPage";
import AdminPanelPage from "./pages/admin/AdminPanelPage";

import VisitorPopup from "./components/VisitorPopup";
import CookieBanner from "./components/CookieBanner";
import Chatbot from "./components/Chatbot"; // ⭐ AI Chatbot

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  if (!token) return <Navigate to="/login" state={{ from: location }} />;
  return children;
};

function App() {
  return (
    <>
      {/* ⭐ Popup after 2 minutes for registration */}
      <VisitorPopup />

      {/* ⭐ Cookie consent banner */}
      <CookieBanner />

      {/* ⭐ AI Tutor Chatbot (Floating Button) */}
      <Chatbot />

      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Private Pages */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute>
              <CourseDetailPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses/:courseId/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <PrivateRoute>
              <CertificatesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanelPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
