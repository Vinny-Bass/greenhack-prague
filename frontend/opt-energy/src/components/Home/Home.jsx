import "./Home.css";
import houseImage from "../../assets/house-logo.png";
import GoogleMapsLoader from "../PlacesAutoComplete/GoogleMapsLoader";
import PlacesAutocomplete from "../PlacesAutoComplete/PlacesAutoComplete";

export default function Home() {
    const API_KEY = "AIzaSyCVrqaKz6odqK05Ne7s0QMuP6qiNuLXvkM";
    const libraries = ["places"];
    return (
        <main>
            <div className="main-text">
                <h1>
                    We help you find optimal energy products & compare the best
                    installation companies
                </h1>
                <div className="search-bar">
                    <GoogleMapsLoader apiKey={API_KEY} libraries={libraries}>
                        <PlacesAutocomplete apiKey={API_KEY} libraries={libraries}/>
                    </GoogleMapsLoader>
                </div>
            </div>
            <div className="image-container">
                <img src={houseImage} alt="House with solar panels" />
            </div>
        </main>
    );
}
