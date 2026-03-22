import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import "./Reports.css";

function Reports() {
  const navigate = useNavigate();

  const reports = [
    {
      id: 1,
      title: "Blood Test Report",
      doctor: "Dr. KK Sharma",
      date: "12 Sep 2025",
      status: "Normal",
    },
    {
      id: 2,
      title: "X-Ray Chest",
      doctor: "Dr. R S Pal",
      date: "05 Sep 2025",
      status: "Needs Attention",
    },
    {
      id: 3,
      title: "MRI Scan",
      doctor: "Dr. Rijawna Khatoon",
      date: "28 Aug 2025",
      status: "Reviewed",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="reports-container">
        <h2>📄 Medical Reports</h2>

        <div className="reports-list">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div>
                <h3>{report.title}</h3>
                <p><b>Doctor:</b> {report.doctor}</p>
                <p><b>Date:</b> {report.date}</p>
                <p className={`status ${report.status.replace(" ", "").toLowerCase()}`}>
                  {report.status}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/report-details", { state: report })
                }
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      </section>

      <Chatbot />
    </>
  );
}

export default Reports;
