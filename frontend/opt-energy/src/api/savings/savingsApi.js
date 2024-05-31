import getClient from "../apiClient";

export const getSavingsData = async (placeName, expendPerMonth) => {
    const URL = process.env.SAVINGS_API_URL;
    try {
        const client = getClient(URL)
        const response = await client.get(`/?placeName=${placeName}&costPerMonth=${expendPerMonth}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch savings data:', error);
        throw error;
    }
}