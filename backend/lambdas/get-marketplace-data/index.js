module.exports.handler = async (event) => {
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

    return {
        statusCode: 200,
        headers: {  	
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ data: mockOffers })
    };
};
