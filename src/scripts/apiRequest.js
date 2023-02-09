import axios from "axios";

const fetchRickAndMortyApi = axios.create({
    baseURL: "https://rickandmortyapi.com/api",
    headers: { "Content-Type": "application/json" },
});

fetchRickAndMortyApi.interceptors.response.use((response) => {
    if (response.status === 200) {
        console.log("Successful");
    }
    return response;
});

export const getData = async (part, isAmountRequest = false) => {
    try {
        const response = await fetchRickAndMortyApi.get(`${part}`);
        if (part.endsWith("character")) {
            if (isAmountRequest) {
                return await response.data.info.count;
            }
            return await response.data.results;
        } else {
            return await response.data;
        }
    } catch {
        throw new Error("Fetching error");
    }
};
