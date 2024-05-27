import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const PlacesAutocomplete = ({ apiKey }) => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteServiceRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && !autocompleteServiceRef.current) {
      autocompleteServiceRef.current = new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const handleInputChange = (event) => {
    setAddress(event.target.value);
    if (autocompleteServiceRef.current) {
      autocompleteServiceRef.current.getPlacePredictions(
        { input: event.target.value },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setAddress(suggestion.description);
    setSuggestions([]);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={handleInputChange}
        placeholder="Enter an address"
        style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
      />
      <button>Search</button>
      <div>
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleSelectSuggestion(suggestion)}
            style={{
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ccc',
              marginBottom: '5px',
            }}
          >
            {suggestion.description}
          </div>
        ))}
      </div>
    </div>
  );
};

PlacesAutocomplete.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default PlacesAutocomplete;
