const axios = require("axios");

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
    address_components.forEach((component) => {
        if (component?.types[0] === "country") country = component.short_name;
    });
    return country;
};

const getCountryFinancialData = (country) => {
    let pricePerPanel = 250;
    let priceOfKwh = 0.31;
    let govIncentive = 0.35;
    let perWatt = 1.63;
    let dcToAc = 0.9;

    if (country === "CZ") {
        pricePerPanel = 5500;
        priceOfKwh = 8.126;
        govIncentive = 0.50;
        perWatt = 28.36;
        dcToAc = 0.88;
    }

    return {
        pricePerPanel,
        priceOfKwh,
        govIncentive,
        perWatt,
        dcToAc,
    };
};

const calculateROIYears = (data) => {
    const { installationCostTotal, solarIncentives, yearlyUtilityBillEstimates, yearlyCostWithoutSolar } = data;
    const initialInvestment = installationCostTotal - (installationCostTotal * solarIncentives);
    let cumulativeSavings = 0;
    let years = 0;

    for (let i = 0; i < yearlyUtilityBillEstimates.length; i++) {
        const yearlySavings = yearlyCostWithoutSolar[i] - yearlyUtilityBillEstimates[i];
        cumulativeSavings += yearlySavings;
        years++;
        if (cumulativeSavings >= initialInvestment) {
            break;
        }
    }

    return years;
};

module.exports.handler = async (event) => {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "";
    const { placeName, costPerMonth } = event.queryStringParameters;

    if (!placeName || !costPerMonth)
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Missing placeName or costPerMonth query string" }),
        };

    try {
        const geoData = await getGeoCodeData(GOOGLE_API_KEY, placeName);
        const country = getCountry(geoData);
        const {
            priceOfKwh,
            govIncentive,
            perWatt,
            dcToAc,
        } = getCountryFinancialData(country);
        const { lat, lng } = geoData.geometry.location;
        const solarData = await getSolarData(GOOGLE_API_KEY, lat, lng);

        const results = solarData.solarPotential.solarPanelConfigs.map(
            (config) => {
                const panelsCount = config.panelsCount;
                const yearlyEnergyDcKwh = config.yearlyEnergyDcKwh;

                const monthlyAverageEnergyBill = costPerMonth;
                const energyCostPerKwh = priceOfKwh;
                const panelCapacityWatts = 400;
                const solarIncentives = govIncentive;
                const installationCostPerWatt = perWatt;
                const installationLifeSpan = 20;

                const dcToAcDerate = dcToAc;
                const efficiencyDepreciationFactor = 0.995;
                const costIncreaseFactor = 1.022;
                const discountRate = 1.04;

                const installationSizeKw =
                    (panelsCount * panelCapacityWatts) / 1000;
                const installationCostTotal =
                    installationCostPerWatt * installationSizeKw * 1000;

                const monthlyKwhEnergyConsumption =
                    monthlyAverageEnergyBill / energyCostPerKwh;
                const yearlyKwhEnergyConsumption =
                    monthlyKwhEnergyConsumption * 12;

                const initialAcKwhPerYear = yearlyEnergyDcKwh * dcToAcDerate;
                const yearlyProductionAcKwh = [
                    ...Array(installationLifeSpan).keys(),
                ].map(
                    (year) =>
                        initialAcKwhPerYear *
                        efficiencyDepreciationFactor ** year
                );

                const yearlyUtilityBillEstimates =
                    yearlyProductionAcKwh.map(
                        (yearlyKwhEnergyProduced, year) => {
                            const billEnergyKwh =
                                yearlyKwhEnergyConsumption -
                                yearlyKwhEnergyProduced;
                            const billEstimate =
                                (billEnergyKwh *
                                    energyCostPerKwh *
                                    costIncreaseFactor ** year) /
                                discountRate ** year;
                            return Math.max(billEstimate, 0);
                        }
                    );
                const remainingLifetimeUtilityBill =
                    yearlyUtilityBillEstimates.reduce((x, y) => x + y, 0);
                const totalCostWithSolar = remainingLifetimeUtilityBill    

                const yearlyCostWithoutSolar = [...Array(installationLifeSpan).keys()].map(
                    (year) => (monthlyAverageEnergyBill * 12 * costIncreaseFactor ** year) / discountRate ** year,
                );
                const totalCostWithoutSolar = yearlyCostWithoutSolar.reduce((x, y) => x + y, 0);

                const savings = totalCostWithoutSolar - totalCostWithSolar;

                return {
                    country,
                    installationCost: installationCostTotal,
                    govIncentive: installationCostTotal - (installationCostTotal * solarIncentives),
                    panelsCount,
                    yearlyUtilityBillEstimates,
                    totalCostWithoutSolar,
                    totalCostWithSolar,
                    yearlyCostWithoutSolar,
                    savings,
                    roiYears: calculateROIYears({installationCostTotal, solarIncentives, yearlyUtilityBillEstimates, yearlyCostWithoutSolar}),
                };
            }
        );

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({ data: results }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err,
            }),
        };
    }
};
