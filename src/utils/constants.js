// Application Constants and Configuration

// API Configuration
export const API_BASE_URL = 'http://localhost:5000';

// Internal Calculation Constants (Server-side logic)
export const CALCULATION_CONSTANTS = {
  automated_cost_per_invoice: 0.20,
  error_rate_auto: 0.001, // 0.1%
  time_saved_per_invoice: 8 / 60, // 8 minutes in hours
  min_roi_boost_factor: 1.1
};

// Default Form Values
export const DEFAULT_FORM_VALUES = {
  scenario_name: '',
  monthly_invoice_volume: 2000,
  num_ap_staff: 3,
  avg_hours_per_invoice: 0.17,
  hourly_wage: 30,
  error_rate_manual: 0.005,
  error_cost: 100,
  time_horizon_months: 36,
  one_time_implementation_cost: 50000
};

// Input Validation Rules
export const VALIDATION_RULES = {
  monthly_invoice_volume: { min: 1, max: 1000000 },
  num_ap_staff: { min: 1, max: 100 },
  avg_hours_per_invoice: { min: 0.01, max: 10, step: 0.01 },
  hourly_wage: { min: 1, max: 500, step: 0.01 },
  error_rate_manual: { min: 0.1, max: 10, step: 0.1 }, // percentage
  error_cost: { min: 1, max: 10000 },
  time_horizon_months: { min: 1, max: 60 },
  one_time_implementation_cost: { min: 0, max: 10000000 }
};

// UI Text Constants
export const UI_TEXT = {
  APP_TITLE: 'InvoiceFlow ROI',
  APP_SUBTITLE: 'Automation Payback Calculator',
  SAVE_SUCCESS: 'Scenario saved successfully!',
  SAVE_ERROR: 'Error saving scenario',
  CALCULATION_ERROR: 'Error calculating ROI',
  REPORT_EMAIL_REQUIRED: 'Valid email is required to generate report',
  NO_SCENARIOS: 'No saved scenarios yet. Run a simulation and save it to see it here.',
  LOADING: 'Loading...',
  CALCULATING: 'Calculating...'
};

// Navigation Items
export const NAV_ITEMS = [
  { id: 'simulate', label: 'ROI Calculator', icon: 'Calculator' },
  { id: 'scenarios', label: 'Saved Scenarios', icon: 'FolderOpen' }
];

// Metric Cards Configuration
export const METRIC_CARDS = [
  {
    key: 'monthly_savings',
    label: 'Monthly Savings',
    description: 'Recurring monthly cost reduction',
    icon: 'TrendingUp',
    highlight: true,
    format: (value) => `$${value.toLocaleString()}`
  },
  {
    key: 'payback_months',
    label: 'Payback Period',
    description: 'Time to recover implementation cost',
    icon: 'Clock',
    format: (value) => `${value} months`
  },
  {
    key: 'roi_percentage',
    label: 'ROI',
    description: 'Return on investment',
    icon: 'Target',
    highlight: true,
    format: (value) => `${value}%`
  },
  {
    key: 'cumulative_savings',
    label: 'Total Savings',
    description: 'Cumulative benefit over period',
    icon: 'DollarSign',
    format: (value) => `$${value.toLocaleString()}`
  }
];

// Cost Breakdown Items
export const COST_BREAKDOWN_ITEMS = [
  { key: 'labor_cost_manual', label: 'Current Labor Cost' },
  { key: 'auto_cost', label: 'Automation Cost' },
  { key: 'error_savings', label: 'Error Savings' }
];

// Form Sections Configuration
export const FORM_SECTIONS = [
  {
    title: "Business Basics",
    icon: "Users",
    inputs: [
      {
        name: "monthly_invoice_volume",
        label: "Monthly Invoice Volume",
        type: "number",
        min: 1,
        icon: "Zap"
      },
      {
        name: "num_ap_staff",
        label: "AP Staff Count",
        type: "number",
        min: 1,
        icon: "Users"
      },
      {
        name: "hourly_wage",
        label: "Hourly Wage ($)",
        type: "number",
        step: 0.01,
        min: 1,
        icon: "DollarSign"
      }
    ]
  },
  {
    title: "Process Details",
    icon: "Clock",
    inputs: [
      {
        name: "avg_hours_per_invoice",
        label: "Hours per Invoice",
        type: "number",
        step: 0.01,
        min: 0.01,
        help: "0.17 = 10 minutes",
        icon: "Clock"
      },
      {
        name: "error_rate_manual",
        label: "Manual Error Rate (%)",
        type: "percentage",
        min: 0.1,
        max: 10,
        icon: "AlertCircle"
      },
      {
        name: "error_cost",
        label: "Cost per Error ($)",
        type: "number",
        min: 1,
        icon: "DollarSign"
      }
    ]
  },
  {
    title: "Investment & Timeline",
    icon: "Calculator",
    inputs: [
      {
        name: "time_horizon_months",
        label: "Analysis Period (Months)",
        type: "number",
        min: 1,
        max: 60
      },
      {
        name: "one_time_implementation_cost",
        label: "Implementation Cost ($)",
        type: "number",
        min: 0
      },
      {
        name: "scenario_name",
        label: "Scenario Name",
        type: "text",
        placeholder: "e.g., Q4 Optimization"
      }
    ]
  }
];

// API Endpoints
export const ENDPOINTS = {
  SIMULATE: '/simulate',
  SCENARIOS: '/scenarios',
  REPORT: '/report/generate'
};

// Export all constants as a single object for easy importing
export default {
  API_BASE_URL,
  CALCULATION_CONSTANTS,
  DEFAULT_FORM_VALUES,
  VALIDATION_RULES,
  UI_TEXT,
  NAV_ITEMS,
  METRIC_CARDS,
  COST_BREAKDOWN_ITEMS,
  FORM_SECTIONS,
  ENDPOINTS
};

