import getClient from "../apiClient";

export const getSavingsData = async () => {
    const URL = 'https://q2qq7rac16.execute-api.us-east-1.amazonaws.com';
    try {
        const client = getClient(URL)
        const response = await client.get('/');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}