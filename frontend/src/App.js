import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    if (!userId) {
      alert("Please enter a User ID");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/generate-report/${userId}`);
      setReportData(response.data);
    } catch (error) {
      console.error(error);
      setReportData({ status: "Error fetching report", metrics: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="result-page">
      <div className="result-content">
        <h1 className="page-title">📊 Risk Report Generator</h1>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <button onClick={fetchReport}>Generate Report</button>
        </div>

        {loading && <p className="loading-text">Generating report...</p>}

        {reportData && (
          <>
            <h3 className="report-status">{reportData.status}</h3>

            {reportData.metrics && reportData.metrics.length > 0 && (
              <div className="metrics-container">
                {reportData.metrics.map((metric, index) => {
                  let riskClass = "metric-low";

                  if (metric.toLowerCase().includes("moderate") || metric.toLowerCase().includes("old")) {
                    riskClass = "metric-moderate";
                  }
                  if (metric.toLowerCase().includes("high") || metric.toLowerCase().includes("defaulter") || metric.toLowerCase().includes("very high")) {
                    riskClass = "metric-high";
                  }

                  // Split title & description
                  const [title, ...rest] = metric.split(":");
                  const description = rest.join(":").trim();

                  return (
                    <div key={index} className={`metric-card ${riskClass}`}>
                      <div className="metric-title">{title}</div>
                      <div className="metric-value">{description || "N/A"}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
