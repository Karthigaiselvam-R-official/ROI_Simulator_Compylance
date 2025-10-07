import React, { useState, useEffect } from 'react';

const SimulationForm = ({ onSimulationComplete, initialInput, loading }) => {
  const [formData, setFormData] = useState({
    scenario_name: '',
    monthly_invoice_volume: 2000,
    num_ap_staff: 3,
    avg_hours_per_invoice: 0.17,
    hourly_wage: 30,
    error_rate_manual: 0.5, // Percentage for user
    error_cost: 100,
    time_horizon_months: 36,
    one_time_implementation_cost: 50000,
  });

  // Update form when initialInput changes (when loading a scenario)
  useEffect(() => {
    if (initialInput) {
      console.log('Updating form with initial input:', initialInput);
      // Convert error rate back to percentage for display
      const displayData = {
        ...initialInput,
        error_rate_manual: initialInput.error_rate_manual * 100 // Convert decimal to percentage
      };
      setFormData(displayData);
    }
  }, [initialInput]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Validate required fields
    if (!formData.scenario_name) {
      alert('Please enter a scenario name');
      return;
    }
    
    // Convert percentage to decimal for backend
    const submissionData = {
      ...formData,
      error_rate_manual: formData.error_rate_manual / 100
    };
    
    try {
      await onSimulationComplete(submissionData);
    } catch (error) {
      console.error('Simulation failed:', error);
      // Error is handled by parent component
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="simulation-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Configure Your Invoicing Scenario</h2>
          <p>Enter your current process details to calculate automation benefits</p>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-grid">
            {/* Business Basics */}
            <div className="form-section">
              <h3 className="section-title">Business Basics</h3>
              <div className="input-group">
                <label>Monthly Invoice Volume</label>
                <input
                  type="number"
                  value={formData.monthly_invoice_volume}
                  onChange={(e) => handleChange('monthly_invoice_volume', parseInt(e.target.value) || 0)}
                  min="1"
                  required
                />
              </div>

              <div className="input-group">
                <label>AP Staff Count</label>
                <input
                  type="number"
                  value={formData.num_ap_staff}
                  onChange={(e) => handleChange('num_ap_staff', parseInt(e.target.value) || 0)}
                  min="1"
                  required
                />
              </div>

              <div className="input-group">
                <label>Hourly Wage ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.hourly_wage}
                  onChange={(e) => handleChange('hourly_wage', parseFloat(e.target.value) || 0)}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Process Details */}
            <div className="form-section">
              <h3 className="section-title">Process Details</h3>
              <div className="input-group">
                <label>Hours per Invoice</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.avg_hours_per_invoice}
                  onChange={(e) => handleChange('avg_hours_per_invoice', parseFloat(e.target.value) || 0)}
                  min="0.01"
                  required
                />
                <small>0.17 = 10 minutes per invoice</small>
              </div>

              <div className="input-group">
                <label>Manual Error Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.error_rate_manual}
                  onChange={(e) => handleChange('error_rate_manual', parseFloat(e.target.value) || 0)}
                  min="0.1"
                  max="10"
                  required
                />
              </div>

              <div className="input-group">
                <label>Cost per Error ($)</label>
                <input
                  type="number"
                  value={formData.error_cost}
                  onChange={(e) => handleChange('error_cost', parseInt(e.target.value) || 0)}
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Investment & Timeline */}
            <div className="form-section">
              <h3 className="section-title">Investment & Timeline</h3>
              <div className="input-group">
                <label>Analysis Period (Months)</label>
                <input
                  type="number"
                  value={formData.time_horizon_months}
                  onChange={(e) => handleChange('time_horizon_months', parseInt(e.target.value) || 0)}
                  min="6"
                  max="60"
                  required
                />
              </div>

              <div className="input-group">
                <label>Implementation Cost ($)</label>
                <input
                  type="number"
                  value={formData.one_time_implementation_cost}
                  onChange={(e) => handleChange('one_time_implementation_cost', parseInt(e.target.value) || 0)}
                  min="0"
                  required
                />
              </div>

              <div className="input-group">
                <label>Scenario Name *</label>
                <input
                  type="text"
                  value={formData.scenario_name}
                  onChange={(e) => handleChange('scenario_name', e.target.value)}
                  placeholder="e.g., Q4 Optimization Plan"
                  required
                />
                <small>Required to save and generate reports</small>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="calculate-btn btn-primary"
            disabled={loading || !formData.scenario_name}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Calculating ROI...
              </>
            ) : (
              <>
                📊 Calculate ROI & Generate Report
              </>
            )}
          </button>

          {!formData.scenario_name && (
            <div className="form-warning">
              ⚠️ Please enter a scenario name to enable calculation
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SimulationForm;