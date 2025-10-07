import { useState, useCallback } from 'react';
import { API_BASE_URL, ENDPOINTS, UI_TEXT } from '../utils/constants';

const useScenarios = () => {
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadScenarios = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SCENARIOS}`);
      
      if (!response.ok) {
        throw new Error('Failed to load scenarios');
      }
      
      const data = await response.json();
      setScenarios(data);
      return data;
    } catch (err) {
      const errorMessage = err.message || 'Error loading scenarios';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const saveScenario = useCallback(async (scenarioData) => {
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SCENARIOS}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scenarioData),
      });

      if (!response.ok) {
        throw new Error(UI_TEXT.SAVE_ERROR);
      }

      await loadScenarios(); // Refresh the list
      return true;
    } catch (err) {
      const errorMessage = err.message || UI_TEXT.SAVE_ERROR;
      setError(errorMessage);
      throw err;
    }
  }, [loadScenarios]);

  const deleteScenario = useCallback(async (id) => {
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.SCENARIOS}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete scenario');
      }

      setScenarios(prev => prev.filter(s => s.id !== id));
      return true;
    } catch (err) {
      const errorMessage = err.message || 'Error deleting scenario';
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    scenarios,
    loading,
    error,
    loadScenarios,
    saveScenario,
    deleteScenario,
  };
};

export default useScenarios;