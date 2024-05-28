import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useLoadScript } from "@react-google-maps/api";
import "./PlacesAutoComplete.css";

const PlacesAutocomplete = ({ apiKey, libraries }) => {
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const autocompleteServiceRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries: libraries,
    });

    useEffect(() => {
        if (isLoaded && !autocompleteServiceRef.current) {
            autocompleteServiceRef.current =
                new window.google.maps.places.AutocompleteService();
        }
    }, [isLoaded]);

    const handleInputChange = (event) => {
        setAddress(event.target.value);
        if (autocompleteServiceRef.current) {
            autocompleteServiceRef.current.getPlacePredictions(
                { input: event.target.value },
                (predictions, status) => {
                    if (
                        status ===
                        window.google.maps.places.PlacesServiceStatus.OK
                    ) {
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

    const handleSearch = () => {
        navigate(`/chart/${address}`);
    }

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="autocomplete-container">
            <div className="search-bar">
                <input
                    type="text"
                    value={address}
                    onChange={handleInputChange}
                    placeholder="Enter an address"
                    className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            <div
                className="suggestions-container"
                hidden={suggestions.length == 0}
            >
                {suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectSuggestion(suggestion)}
                        className="suggestion-item"
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
    libraries: PropTypes.array.isRequired,
};

export default PlacesAutocomplete;
