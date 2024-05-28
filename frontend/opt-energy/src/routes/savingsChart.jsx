import { useEffect, useState } from "react";
import SolarSavingsOverview from "../components/SolarSavingsOverview/SolarSavingsOverview"
import Header from "../components/common/Header/Header"
import { fetchSavingsData } from "../services/savingsService";
import { fetchMarketplaceData } from "../services/marketplaceService";
import NeighbourOffers from "../components/NeighbourOffers/NeighbourOffers";
import { useParams } from "react-router-dom";


export default function SavingsChart() {
    const { placeName } = useParams();
    const [savings, setSavings] = useState(null);
    const [marketplace, setMarketplace] = useState(null);

    useEffect(() => {
        const getSavingsData = async () => {
            const data = await fetchSavingsData();
            setSavings(data);
        };

        const getMarketplaceData = async () => {
            const data = await fetchMarketplaceData();
            setMarketplace(data);
        };

        getSavingsData();
        getMarketplaceData();
    }, [placeName]);

    return (
        <>
            <Header />
            <div className="container">
                <SolarSavingsOverview data={savings} />
                <NeighbourOffers offers={marketplace} />
            </div>
        </>
    )
}