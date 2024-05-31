import { getMarketplaceData } from "../api/marketplace/marketplaceApi";

export const fetchMarketplaceData = async () => {
    const result = await getMarketplaceData();
    return result.data;
}