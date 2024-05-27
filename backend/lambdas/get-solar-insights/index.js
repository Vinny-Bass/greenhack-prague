module.exports.handler = async (event) => {
    const mockData = {
        country: 'United Kingdom',
        installationCost: 3100000,
        govIncentive: 70000,
        panels: 4,
        yearsToRecover: 5,
        currentlyCostPerYear: 24000,
        savingPerYear: 12000,
        savingPerMonth: 1000
    }

    return {
        statusCode: 200,
        headers: {  	
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ data: mockData })
    };
};
