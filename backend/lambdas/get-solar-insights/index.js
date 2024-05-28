const axios = require('axios');

async function getGeoCodeData(apiKey, placeName) {
    try {
        const geocodeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    address: placeName,
                    key: apiKey,
                },
            }
        );
        return geocodeResponse.data.results[0];
    } catch (err) {
        console.log(err);
        throw new Error("Error getting geodata");
    }
}


async function getSolarData(apiKey, lat, lng) {
    try {
        const solarResponse = await axios.get(
            `https://solar.googleapis.com/v1/buildingInsights:findClosest`,
            {
                params: {
                    "location.latitude": lat,
                    "location.longitude": lng,
                    key: apiKey,
                },
            }
        );
        return solarResponse.data;
    } catch (err) {
        throw new Error("Error getting solar data");
    }
}

const getCountry = (geoData) => {
    let country = "GB";
    if (!geoData) return country;

    const { address_components } = geoData;
    address_components.forEach(component => {
        if (component?.types[0] === "country")
            country = component.short_name;
    });
    return country;
}

const getCountryFinancialData = (country) => {
    let pricePerPanel = 250;
    let priceOfKwh = 25.72;
    let installationCost = 7000;
    let govIncentive = installationCost * 0.35;

    if (country === "CZ") {
        pricePerPanel = 5500;
        priceOfKwh = 8.126;
        installationCost = 500000;
        govIncentive = 250000;
    }

    return { pricePerPanel, priceOfKwh, installationCost, govIncentive };
}


module.exports.handler = async (event) => {
    const GOOGLE_API_KEY = "AIzaSyCVrqaKz6odqK05Ne7s0QMuP6qiNuLXvkM";
    const { placeName, costPerYear } = event.queryStringParameters;

    if (!placeName) 
        return { statusCode: 404, body: JSON.stringify({message: "Missing placeName query string"})}

    try {
        const geoData = await getGeoCodeData(GOOGLE_API_KEY, placeName);
        const country = getCountry(geoData);
        const { priceOfKwh, pricePerPanel, installationCost, govIncentive } = getCountryFinancialData(country);
        const { lat, lng } = geoData.geometry.location
        const solarData = await getSolarData(GOOGLE_API_KEY, lat, lng);
        
        const results = solarData.solarPotential.solarPanelConfigs.map(config => {
            const panels = config.panelsCount;
            const energy = config.yearlyEnergyDcKwh;
            const yearsToRecover = panels * pricePerPanel / (energy * priceOfKwh);
            const currentlyCostPerYear = costPerYear;
            const savingPerYear = energy * priceOfKwh;
            const savingPerMonth = savingPerYear / 12;

            return {
                country,
                installationCost,
                govIncentive,
                panels, 
                yearsToRecover,
                currentlyCostPerYear,
                savingPerYear,
                savingPerMonth
            }
        });

        return {
            statusCode: 200,
            headers: {  	
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ data: results })
        };
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err
            })
        }
    }
};
