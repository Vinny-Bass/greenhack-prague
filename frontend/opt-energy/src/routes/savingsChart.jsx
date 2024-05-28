import { useEffect, useState } from "react";
import SolarSavingsOverview from "../components/SolarSavingsOverview/SolarSavingsOverview"
import Header from "../components/common/Header/Header"
import { fetchSavingsData } from "../services/savingsService";
import { fetchMarketplaceData } from "../services/marketplaceService";
import NeighbourOffers from "../components/NeighbourOffers/NeighbourOffers";
import { useParams } from "react-router-dom";
import "./savingsChart.css"


export default function SavingsChart() {
    const { placeName } = useParams();
    const [savings, setSavings] = useState(null);
    const [expendPerMonth, setExpendPerMonth] = useState('80');
    const [marketplace, setMarketplace] = useState(null);

    useEffect(() => {
        const userInput = window.prompt("How much you expend per month in electricity:");
        if (userInput && userInput.trim() !== '') {
            setExpendPerMonth(userInput);
        } else {
            alert('Input cannot be empty. Please reload the page and try again.');
        }
    }, []);

    useEffect(() => {
        const getSavingsData = async () => {
            const data = await fetchSavingsData(placeName, expendPerMonth);
            setSavings(data);
        };

        const getMarketplaceData = async () => {
            const data = await fetchMarketplaceData();
            setMarketplace(data);
        };

        getSavingsData();
        getMarketplaceData();
    }, [placeName, expendPerMonth]);

    return (
        <>
            <Header />
            <div className="container">
                {savings && (
                    <SolarSavingsOverview data={savings} className="solar-savings-overview" />
                )}
                <NeighbourOffers offers={marketplace} className="neighbour-offers" />
            </div>
        </>
    );
}