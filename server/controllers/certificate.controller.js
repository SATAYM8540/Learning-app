import Certificate from "../models/Certificate.js";

export const getMyCertificates = async (req, res) => {
  const certs = await Certificate.find({ student: req.user.id }).populate(
    "course"
  );
  res.json(certs);
};

export const downloadCertificate = async (req, res) => {
  const cert = await Certificate.findById(req.params.id);
  if (!cert || cert.student.toString() !== req.user.id) {
    return res.status(404).json({ message: "Not found" });
  }
  res.download(cert.filePath);
};
