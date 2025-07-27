const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const { exec } = require('child_process');

const app = express();
app.use(cors());

const PORT = 5000;

// ✅ Endpoint to generate risk report by calling Python script
app.get('/generate-report/:id', (req, res) => {
  const userId = req.params.id;

  // Call Python script
  exec(`python plot_script.py ${userId}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).json({ status: 'Error generating report' });
    }
    if (stderr) {
      console.error(`⚠️ Stderr: ${stderr}`);
    }

    // Split output into lines
    const lines = stdout.trim().split('\n').filter(line => line.trim() !== '');
    res.json({ status: "Risk report generated", metrics: lines });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
