import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { ensureAdminUser } from "./config/createAdmin.js";

import authRoutes from "./routes/auth.routes.js";
import courseRoutes from "./routes/course.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import attemptRoutes from "./routes/attempt.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";


import visitorRoutes from "./routes/visitor.routes.js";
import chatRoutes from "./routes/chat.routes.js";

dotenv.config();

const app = express();

connectDB().then(ensureAdminUser);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/attempts", attemptRoutes);
app.use("/api/certificates", certificateRoutes);

app.use("/api/visitor", visitorRoutes);
app.use("/api/chat", chatRoutes);


app.get("/", (req, res) => {
  res.send("Online Learning API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
