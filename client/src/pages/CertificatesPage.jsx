import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await api.get("/certificates/me");
      setCertificates(data);
    };
    load();
  }, []);

  const download = (id) => {
    window.open(`http://localhost:5000/api/certificates/${id}/download`, "_blank");
  };

  return (
    <div style={{ maxWidth: 900, margin: "1.5rem auto", padding: "0 1rem" }}>
      <h2>My Certificates</h2>
      {certificates.length === 0 && <p>No certificates yet.</p>}
      <ul>
        {certificates.map((c) => (
          <li key={c._id} style={{ marginBottom: "0.75rem" }}>
            {c.course?.title} —{" "}
            {new Date(c.issuedAt).toLocaleDateString()}
            <button style={{ marginLeft: "1rem" }} onClick={() => download(c._id)}>
              Download PDF
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
