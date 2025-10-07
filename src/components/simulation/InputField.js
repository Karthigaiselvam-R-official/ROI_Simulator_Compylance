import React from 'react';

const InputField = ({ 
  name, 
  label, 
  type, 
  value, 
  onChange, 
  icon: Icon, 
  help, 
  required,
  ...props 
}) => {
  const handleChange = (e) => {
    const rawValue = e.target.value;
    
    if (type === 'number') {
      onChange(rawValue === '' ? '' : parseFloat(rawValue));
    } else {
      onChange(rawValue);
    }
  };

  const displayValue = value;

  return (
    <div className="input-field">
      <label htmlFor={name} className="input-label">
        {Icon && <Icon size={18} />}
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      
      <div className="input-container">
        <input
          id={name}
          name={name}
          type={type}
          value={displayValue}
          onChange={handleChange}
          className="input"
          required={required}
          {...props}
        />
        {type === 'percentage' && <span className="input-suffix">%</span>}
      </div>
      
      {help && <div className="input-help">{help}</div>}
    </div>
  );
};

export default InputField;