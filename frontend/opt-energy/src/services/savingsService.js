import { getSavingsData } from "../api/savings/savingsApi";

export const fetchSavingsData = async (placeName, expendPerMonth) => {
    const savings = await getSavingsData(placeName, expendPerMonth);
    return savings.data;
}