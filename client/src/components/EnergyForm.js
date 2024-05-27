import React, { useState } from 'react';
import axios from 'axios';

const EnergyForm = ({ setRecommendations, setLocation, setZoomLevel }) => {
  const [formData, setFormData] = useState({
    familySize: '',
    evPlans: '',
    heatingMethod: '',
    energyGoals: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.familySize || !formData.evPlans || !formData.heatingMethod || !formData.energyGoals || !formData.address) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/analyze', formData);
      setRecommendations(response.data);
      
      const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formData.address}&key=AIzaSyAPVgms3MqXRRBVI58oFsmtjPKH5JHWd48`);
      const location = geocodeResponse.data.results[0].geometry.location;
      setLocation(location);
      setZoomLevel(19); // Set zoom level to the maximum value
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Family Size:
        <input type="text" name="familySize" value={formData.familySize} onChange={handleChange} />
      </label>
      <br />
      <label>
        EV Plans:
        <input type="text" name="evPlans" value={formData.evPlans} onChange={handleChange} />
      </label>
      <br />
      <label>
        Heating Method:
        <input type="text" name="heatingMethod" value={formData.heatingMethod} onChange={handleChange} />
      </label>
      <br />
      <label>
        Energy Goals:
        <input type="text" name="energyGoals" value={formData.energyGoals} onChange={handleChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Analyze</button>
    </form>
  );
};

export default EnergyForm;
