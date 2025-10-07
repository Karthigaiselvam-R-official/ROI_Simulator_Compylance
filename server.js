const express = require('express');
const cors = require('cors');
const database = require('./database');
const calculator = require('./simulations/calculator');

const app = express();
const PORT = 5000;

// Fix CORS to allow frontend connection
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize database
database.init();

// Test endpoint
app.get('/', (req, res) => {
  res.json({ message: 'ROI Simulator API is running!' });
});

// Simulation endpoint - FIXED
app.post('/simulate', (req, res) => {
  try {
    console.log('Received simulation request:', req.body);
    const input = req.body;
    const result = calculator.calculateROI(input);
    console.log('Calculation result:', result);
    res.json(result);
  } catch (error) {
    console.error('Simulation error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Save scenario endpoint
app.post('/scenarios', async (req, res) => {
  try {
    const scenario = await database.saveScenario(req.body);
    res.json(scenario);
  } catch (error) {
    console.error('Save scenario error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all scenarios endpoint
app.get('/scenarios', async (req, res) => {
  try {
    const scenarios = await database.getAllScenarios();
    res.json(scenarios);
  } catch (error) {
    console.error('Get scenarios error:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get specific scenario endpoint
app.get('/scenarios/:id', async (req, res) => {
  try {
    const scenario = await database.getScenario(req.params.id);
    if (scenario) {
      res.json(scenario);
    } else {
      res.status(404).json({ error: 'Scenario not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete scenario endpoint
app.delete('/scenarios/:id', async (req, res) => {
  try {
    const success = await database.deleteScenario(req.params.id);
    res.json({ success });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Report generation endpoint - NEW
app.post('/report/generate', async (req, res) => {
  try {
    const { email, scenarioData } = req.body;
    
    console.log('Report generation request for:', email);
    
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Generate simple report (in real app, use PDF library)
    const report = {
      email: email,
      scenario: scenarioData.input.scenario_name,
      generatedAt: new Date().toISOString(),
      results: scenarioData.result,
      inputs: scenarioData.input
    };

    // Simulate email sending
    console.log(`📧 Report would be sent to: ${email}`);
    console.log('📊 Report data:', report);

    // Return success with report data
    res.json({ 
      success: true, 
      message: `Report generated and sent to ${email}`,
      report: report 
    });
    
  } catch (error) {
    console.error('Report generation error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available:`);
  console.log(`   POST /simulate - Calculate ROI`);
  console.log(`   POST /scenarios - Save scenario`);
  console.log(`   GET /scenarios - List scenarios`);
  console.log(`   POST /report/generate - Generate report`);
});