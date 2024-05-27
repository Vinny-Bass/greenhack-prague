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

    const mockOffers = [
        {
            profilePic: 'https://via.placeholder.com/50',
            name: 'John Doe',
            distance: 200,
            price: '£0.10 per kWh'
        },
        {
            profilePic: 'https://via.placeholder.com/50',
            name: 'Jane Smith',
            distance: 350,
            price: '£0.09 per kWh'
        },
        {
            profilePic: 'https://via.placeholder.com/50',
            name: 'Emily Johnson',
            distance: 500,
            price: '£0.11 per kWh'
        }
    ];

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