import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";


function ReportDetails() {
  const location = useLocation();
  const report = location.state;

  return (
    <>
      <Navbar />

      <section className="report-details-container">
        <h2>📄 {report.title}</h2>

        <div className="report-box">
          <h3>Patient Information</h3>
          <p>
            <b>Name:</b> Rishabh
          </p>
          <p>
            <b>Age:</b> 23
          </p>
          <p>
            <b>Gender:</b> Male
          </p>

          <hr />

          <h3>Doctor Information</h3>
          <p>
            <b>Doctor:</b> {report.doctor}
          </p>
          <p>
            <b>Date:</b> {report.date}
          </p>

          <hr />

          <h3>Test Results</h3>
          <table>
            <thead>
              <tr>
                <th>Test</th>
                <th>Result</th>
                <th>Normal Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Hemoglobin</td>
                <td>14.2 g/dL</td>
                <td>13 – 17</td>
              </tr>
              <tr>
                <td>WBC</td>
                <td>7,500 /µL</td>
                <td>4,000 – 11,000</td>
              </tr>
              <tr>
                <td>Platelets</td>
                <td>2.5 lakh</td>
                <td>1.5 – 4.5 lakh</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <h3>Doctor Remarks</h3>
          <p>
            Patient is stable. All parameters are within the normal range.
            Continue regular diet and exercise.
          </p>

          <button className="download-btn">⬇ Download Report</button>
        </div>
      </section>

      <Chatbot />
    </>
  );
}

export default ReportDetails;
