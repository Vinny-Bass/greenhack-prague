import { getSavingsData } from "../api/savings/savingsApi";

export const fetchSavingsData = async ({ placeName }) => {
    const savings = await getSavingsData(placeName);
    return savings.data;
}