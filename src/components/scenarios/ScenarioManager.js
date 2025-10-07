import React from 'react';
import { FolderOpen, Calendar, Trash2, Play, Loader } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { UI_TEXT } from '../../utils/constants';

const ScenarioManager = ({ 
  scenarios, 
  loading, 
  error,
  onLoadScenario, 
  onDeleteScenario 
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async (scenario) => {
    if (window.confirm(`Are you sure you want to delete "${scenario.name}"?`)) {
      await onDeleteScenario(scenario.id);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <Loader size={48} className="loading-spinner" />
        <p>Loading scenarios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error loading scenarios: {error}</p>
      </div>
    );
  }

  if (!scenarios || scenarios.length === 0) {
    return (
      <div className="empty-state">
        <FolderOpen size={48} className="empty-icon" />
        <h3>No Saved Scenarios</h3>
        <p>{UI_TEXT.NO_SCENARIOS}</p>
      </div>
    );
  }

  return (
    <div className="scenarios-manager">
      <div className="scenarios-header">
        <h2>Saved Scenarios</h2>
        <p>Manage and load your previous ROI analyses</p>
      </div>

      <div className="scenarios-grid">
        {scenarios.map((scenario) => (
          <Card key={scenario.id} hover className="scenario-card">
            <div className="scenario-header">
              <h3 className="scenario-name">{scenario.name}</h3>
              <div className="scenario-date">
                <Calendar size={14} />
                <span>{formatDate(scenario.created_at)}</span>
              </div>
            </div>

            <div className="scenario-metrics">
              <div className="scenario-metric">
                <span className="metric-label">Volume:</span>
                <span className="metric-value">
                  {scenario.input.monthly_invoice_volume}/month
                </span>
              </div>
              <div className="scenario-metric">
                <span className="metric-label">Staff:</span>
                <span className="metric-value">{scenario.input.num_ap_staff}</span>
              </div>
              <div className="scenario-metric">
                <span className="metric-label">Savings:</span>
                <span className="metric-value highlight">
                  ${scenario.result.monthly_savings?.toLocaleString()}/month
                </span>
              </div>
              <div className="scenario-metric">
                <span className="metric-label">ROI:</span>
                <span className="metric-value highlight">
                  {scenario.result.roi_percentage}%
                </span>
              </div>
            </div>

            <div className="scenario-actions">
              <Button
                variant="primary"
                size="small"
                icon={Play}
                onClick={() => onLoadScenario(scenario)}
              >
                Load
              </Button>
              <Button
                variant="danger"
                size="small"
                icon={Trash2}
                onClick={() => handleDelete(scenario)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScenarioManager;