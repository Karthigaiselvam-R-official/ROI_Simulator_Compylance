import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import SimulationForm from './components/simulation/SimulationForm';
import Results from './components/simulation/Results';
import ScenarioManager from './components/scenarios/ScenarioManager';
import ReportModal from './components/common/ReportModal';
import useSimulation from './hooks/useSimulation';
import useScenarios from './hooks/useScenarios';
import './styles/globals.css';
import './styles/components/forms.css';
import './styles/components/cards.css';

function App() {
  const [activeTab, setActiveTab] = useState('simulate');
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Use the hooks properly - destructure all returned values
  const simulation = useSimulation();
  const scenarios = useScenarios();

  // DEBUG: Check if hooks are working properly
  console.log('Simulation hook:', simulation);
  console.log('runSimulation function:', simulation.runSimulation);
  console.log('Scenarios hook:', scenarios);

  // Extract values from simulation hook
  const { 
    results, 
    currentInput, 
    loading: simulationLoading, 
    error: simulationError, 
    runSimulation 
  } = simulation;

  // Extract values from scenarios hook
  const { 
    scenarios: scenarioList, 
    loading: scenariosLoading,
    loadScenarios, 
    saveScenario,
    deleteScenario 
  } = scenarios;

  useEffect(() => {
    if (activeTab === 'scenarios') {
      loadScenarios();
    }
  }, [activeTab, loadScenarios]);

  const handleSimulationComplete = async (inputData) => {
    try {
      console.log('App: Starting simulation with:', inputData);
      console.log('App: runSimulation function available:', typeof runSimulation);
      
      if (typeof runSimulation !== 'function') {
        throw new Error('runSimulation is not a function. Check the useSimulation hook.');
      }
      
      const result = await runSimulation(inputData);
      console.log('App: Simulation completed:', result);
    } catch (error) {
      console.error('App: Simulation failed:', error);
      alert('Calculation failed: ' + error.message);
    }
  };

  const handleSaveScenario = async () => {
    if (!currentInput?.scenario_name) {
      alert('Please enter a scenario name first');
      return;
    }

    try {
      await saveScenario({
        scenario_name: currentInput.scenario_name,
        input: currentInput,
        result: results
      });
      alert('✅ Scenario saved successfully!');
    } catch (error) {
      alert('❌ Error saving scenario: ' + error.message);
    }
  };

  const handleLoadScenario = (scenario) => {
    console.log('Loading scenario:', scenario);
  };

  const handleDeleteScenario = async (scenarioId) => {
    if (window.confirm('Are you sure you want to delete this scenario?')) {
      try {
        await deleteScenario(scenarioId);
      } catch (error) {
        alert('Error deleting scenario: ' + error.message);
      }
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'simulate' && (
        <div className="simulation-view">
          <SimulationForm
            onSimulationComplete={handleSimulationComplete}
            initialInput={currentInput}
            loading={simulationLoading}
          />
          
          {simulationError && (
            <div className="error-message">
              ❌ {simulationError}
            </div>
          )}
          
          {results && (
            <Results
              results={results}
              input={currentInput}
              onSaveScenario={handleSaveScenario}
              onGenerateReport={() => setShowReportModal(true)}
              loading={simulationLoading}
            />
          )}
        </div>
      )}

      {activeTab === 'scenarios' && (
        <ScenarioManager
          scenarios={scenarioList}
          loading={scenariosLoading}
          onLoadScenario={handleLoadScenario}
          onDeleteScenario={handleDeleteScenario}
        />
      )}

      {showReportModal && currentInput && results && (
        <ReportModal
          scenarioData={{ input: currentInput, result: results }}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </Layout>
  );
}

export default App;