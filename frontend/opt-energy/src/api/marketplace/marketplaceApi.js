import getClient from "../apiClient";

export const getMarketplaceData = async () => {
    const URL = 'https://n5kh20cv2c.execute-api.us-east-1.amazonaws.com';
    try {
        const client = getClient(URL)
        const response = await client.get('/');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch marketplace data:', error);
        throw error;
    }
}