import { useState, useCallback } from 'react';

const useSimulation = () => {
  const [results, setResults] = useState(null);
  const [currentInput, setCurrentInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runSimulation = useCallback(async (inputData) => {
    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      console.log('Sending simulation request:', inputData);
      
      const response = await fetch('http://localhost:5000/simulate', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Simulation result received:', result);
      
      setResults(result);
      setCurrentInput(inputData);
      return result;
    } catch (err) {
      console.error('Simulation error:', err);
      const errorMessage = err.message || 'Error calculating ROI. Please check if the backend server is running.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetSimulation = useCallback(() => {
    setResults(null);
    setCurrentInput(null);
    setError(null);
  }, []);

  return {
    results,
    currentInput,
    loading,
    error,
    runSimulation, // Make sure this is returned
    resetSimulation,
  };
};

export default useSimulation;