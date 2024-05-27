import { getSavingsData } from "../api/savings/savingsApi";

export const fetchSavingsData = async () => {
    const savings = await getSavingsData();
    return savings.data;
}