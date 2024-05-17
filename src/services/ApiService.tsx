import axios, { AxiosRequestConfig } from 'axios';

export const createAPIEndpointService = (endpoint: string) => {
    let _url = '/api/v1/' + endpoint ;
    
    return {
        fetch: (headers?: AxiosRequestConfig) => axios.get(_url, headers),
        fetchById: (id: string, headers?: AxiosRequestConfig) => axios.get(_url+`/${id}`, headers),
        put: (id: string, headers?: AxiosRequestConfig) => axios.put(_url+id, headers),
        post: (newRecord?: any, headers?: AxiosRequestConfig) => axios.post(_url, newRecord, headers),
        delete: (id: string, headers?: AxiosRequestConfig) => axios.delete(_url+id, headers) 
    }
}