import getClient from "../apiClient";

export const getMarketplaceData = async () => {
    const URL = process.env.MARKETPLACE_API_URL;
    try {
        const client = getClient(URL)
        const response = await client.get('/');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch marketplace data:', error);
        throw error;
    }
}