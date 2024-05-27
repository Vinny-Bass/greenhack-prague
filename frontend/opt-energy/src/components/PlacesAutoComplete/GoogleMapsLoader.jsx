import { LoadScript } from "@react-google-maps/api";
import PropTypes from 'prop-types';

const GoogleMapsLoader = ({ children, apiKey, libraries }) => {
    return (
        <LoadScript
            googleMapsApiKey={apiKey}
            libraries={libraries}
        >
            {children}
        </LoadScript>
    );
};

GoogleMapsLoader.propTypes = {
    children: PropTypes.element.isRequired,
    apiKey: PropTypes.string.isRequired,
    libraries: PropTypes.array.isRequired
}

export default GoogleMapsLoader;
