import "./Home.css";
import houseImage from "../../assets/house-logo.jpg";
// import GoogleMapsLoader from "../PlacesAutoComplete/GoogleMapsLoader";
// import PlacesAutocomplete from "../PlacesAutoComplete/PlacesAutoComplete";
// import Autocomplete from "react-google-autocomplete";


export default function Home() {
    //const API_KEY = "AIzaSyBPNpf4aohuw_fjAB6QZqu06FVxRJ6EM7o";
    return (
        <main>
            <div className="main-text">
                <h1>
                    We help you find optimal energy products & compare the best
                    installation companies
                </h1>
                <div className="search-bar">
                    <input type="text" placeholder="Put your address in to relevant info" />
                    <button>Search</button>
                    {/* <Autocomplete
                        apiKey={API_KEY}
                        onPlaceSelected={(place) => {
                            console.log(place);
                        }}
                    />; */}
                    {/* <GoogleMapsLoader>
                        <PlacesAutocomplete />
                    </GoogleMapsLoader> */}
                </div>
            </div>
            <div className="image-container">
                <img src={houseImage} alt="House with solar panels" />
            </div>
        </main>
    );
}
