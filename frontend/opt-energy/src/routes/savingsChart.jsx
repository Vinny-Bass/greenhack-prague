import { useEffect, useState } from "react";
import SolarSavingsOverview from "../components/SolarSavingsOverview/SolarSavingsOverview"
import Header from "../components/common/Header/Header"
import { fetchSavingsData } from "../services/savingsService";
import NeighbourOffers from "../components/NeighbourOffers/NeighbourOffers";

export default function SavingsChart() {
    const [savings, setSavings] = useState({});

    useEffect(() => {
        const getSavingsData = async () => {
            const data = await fetchSavingsData();
            setSavings(data);
        };

        getSavingsData();
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <SolarSavingsOverview data={savings} />
                <NeighbourOffers offers={mockOffers} />
            </div>
        </>
    )
}