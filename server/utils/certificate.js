import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { v4 as uuid } from "uuid";

import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateCertificateForStudent = async (
  studentId,
  courseId,
  issuedBy
) => {
  const [student, course] = await Promise.all([
    User.findById(studentId),
    Course.findById(courseId)
  ]);

  const certId = uuid();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; text-align:center; padding:60px; }
          .card { border: 4px solid #000; padding:40px; }
          h1 { font-size: 32px; margin-bottom: 0; }
          h2 { margin-top: 5px; font-size: 20px; }
          .name { font-size: 26px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Certificate of Completion</h1>
          <h2>Presented to</h2>
          <div class="name">${student.name}</div>
          <p>for successfully completing the course</p>
          <h2>${course.title}</h2>
          <p>Certificate ID: ${certId}</p>
          <p>Issued on: ${new Date().toLocaleDateString()}</p>
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();

  const certDir = path.join(__dirname, "..", "certificates");
  if (!fs.existsSync(certDir)) fs.mkdirSync(certDir);

  const filePath = path.join(certDir, `${certId}.pdf`);
  fs.writeFileSync(filePath, pdfBuffer);

  const certificate = await Certificate.create({
    student: studentId,
    course: courseId,
    certificateId: certId,
    filePath,
    issuedBy
  });

  return certificate;
};
