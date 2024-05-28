import { getMarketplaceData } from "../api/marketplace/marketplaceApi";

export const fetchMarketplaceData = async () => {
    const result = await getMarketplaceData();
    console.log({ result })
    return result.data;
}