const GOOGLE_API_KEY = "";
const DC_TO_AC_DERATE = 0.85;
const EFFICIENCY_DEPRECIATION_FACTOR = 0.995;
const INSTALLATION_LIFESPAN = 20;
const COST_INCREASE_FACTOR = 1.022;
const DISCOUNT_RATE = 1.04;

const billCostModel = (kWh) => kWh * 0.1; // Example: $0.10 per kWh
const installationCostModel = (installationSize) => installationSize * 1000; // Example: $1000 per kW
const geocodeResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
        params: {
            address: "Rinconada Library",
            key: GOOGLE_API_KEY,
        },
    }
);
const location = geocodeResponse.data.results[0].geometry.location;
// Call the Solar API
const solarResponse = await axios.get(
    `https://solar.googleapis.com/v1/buildingInsights:findClosest`,
    {
        params: {
            "location.latitude": location.lat,
            "location.longitude": location.lng,
            key: GOOGLE_API_KEY,
        },
    }
);
const solarData = solarResponse.data;
// Helper function to calculate lifetime production
const calculateLifetimeProduction = (yearlyEnergyDcKwh) => {
    return (
        (DC_TO_AC_DERATE *
            yearlyEnergyDcKwh *
            (1 -
                Math.pow(
                    EFFICIENCY_DEPRECIATION_FACTOR,
                    INSTALLATION_LIFESPAN
                ))) /
        (1 - EFFICIENCY_DEPRECIATION_FACTOR)
    );
};
    const energy = 120;
    const results = solarData.solarPotential.solarPanelConfigs.map((config) => {
        const installationSize =
            config.panelsCount * (solarData.panelCapacityWatts / 1000);
        const initialAcKwhPerYear = config.yearlyEnergyDcKwh * DC_TO_AC_DERATE;
        const lifetimeProduction = calculateLifetimeProduction(
            config.yearlyEnergyDcKwh
        );
        const lifetimeUtilityBillWithSolar = Array.from(
            { length: INSTALLATION_LIFESPAN },
            (_, year) => {
                return (
                    (billCostModel(
                        energy * 12 -
                            initialAcKwhPerYear *
                                Math.pow(EFFICIENCY_DEPRECIATION_FACTOR, year)
                    ) *
                        Math.pow(COST_INCREASE_FACTOR, year)) /
                    Math.pow(DISCOUNT_RATE, year)
                );
            }
        ).reduce((acc, bill) => acc + bill, 0);
        const lifetimeUtilityBillWithoutSolar = Array.from(
            { length: INSTALLATION_LIFESPAN },
            (_, year) => {
                return (
                    (billCostModel(energy * 12) *
                        Math.pow(COST_INCREASE_FACTOR, year)) /
                    Math.pow(DISCOUNT_RATE, year)
                );
            }
        ).reduce((acc, bill) => acc + bill, 0);
        const installationCost = installationCostModel(installationSize);

        return {
            panelsCount: config.panelsCount,
            installationSize,
            installationCost,
            monthlyBillWithSolar:
                billCostModel(energy * 12 - initialAcKwhPerYear) / 12,
            paybackPeriod:
                installationCost /
                (lifetimeUtilityBillWithoutSolar -
                    lifetimeUtilityBillWithSolar),
            yearlyCostWithSolar:
                lifetimeUtilityBillWithSolar / INSTALLATION_LIFESPAN,
            yearlyCostWithoutSolar:
                lifetimeUtilityBillWithoutSolar / INSTALLATION_LIFESPAN,
        };
    });
