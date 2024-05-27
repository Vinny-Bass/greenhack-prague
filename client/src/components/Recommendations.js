import React, { useState } from 'react';

const options = [
  {
    name: 'Option 1 - Solar Panels',
    description: 'Details about solar panels...',
    products: ['Solar Panels'],
    savings: 1000,
    roi: '2 years',
  },
  {
    name: 'Option 2 - Battery Storage',
    description: 'Details about battery storage...',
    products: ['Battery Storage'],
    savings: 800,
    roi: '3 years',
  },
  {
    name: 'Option 3 - Combined Options',
    description: 'Details about combined options...',
    products: ['Solar Panels', 'Battery Storage'],
    savings: 1500,
    roi: '2 years',
  },
];

const Recommendations = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div>
      <h2>Recommendations</h2>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${selectedOption === index ? 'active' : ''}`}
            onClick={() => setSelectedOption(index)}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className="option-details">
        <h3>{options[selectedOption].name}</h3>
        <p>{options[selectedOption].description}</p>
        <ul>
          {options[selectedOption].products.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
        <p><strong>Estimated Savings:</strong> ${options[selectedOption].savings}</p>
        <p><strong>Return on Investment (ROI):</strong> {options[selectedOption].roi}</p>
      </div>
    </div>
  );
};

export default Recommendations;
