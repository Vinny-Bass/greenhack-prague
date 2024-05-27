import axios from 'axios';

const getClient = (url) => {
    const apiClient = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return apiClient;
}




export default getClient;
