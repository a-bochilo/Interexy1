import axios, { AxiosResponse } from "axios";

export interface ICharacterData {
    id: string;
    name: string;
    image: string;
    gender: string;
    location: { name: string };
    species: string;
    status: string;
    url: string;
}

const fetchRickAndMortyApi = axios.create({
    baseURL: "https://rickandmortyapi.com/api/character",
    headers: { "Content-Type": "application/json" },
});

fetchRickAndMortyApi.interceptors.response.use((response) => {
    if (response.status === 200) {
        console.log("Successful");
    }
    return response;
});

export const getCharacterById = async (id: number) => {
    try {
        const response = await fetchRickAndMortyApi.get<
            any,
            AxiosResponse<ICharacterData, any>,
            any
        >(`/${id}`);
        return await response.data;
    } catch {
        console.error("Fetch data failure");
    }
};

export const getCharactersByIdArr = async (id: number[]) => {
    try {
        const response = await fetchRickAndMortyApi.get<
            any,
            AxiosResponse<ICharacterData[], any>,
            any
        >(`/${id}`);
        return await response.data;
    } catch {
        console.error("Fetch data failure");
    }
};

export const getAllCharacters = async () => {
    try {
        const response = await fetchRickAndMortyApi.get<
            any,
            AxiosResponse<
                {
                    results: ICharacterData[];
                },
                any
            >,
            any
        >(``);
        return await response.data.results;
    } catch {
        console.error("Fetch data failure");
    }
};
