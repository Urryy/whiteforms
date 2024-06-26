import axios, { AxiosRequestConfig } from 'axios';

export const createAPIEndpointService = (endpoint: string) => {
    const request = axios.create();
    request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.TOKEN}`;
    let uri = '/api/v1/' + endpoint ;

    return {
        fetch: (headers?: AxiosRequestConfig) => request.get(uri, headers),
        fetchById: (id: string, headers?: AxiosRequestConfig) => request.get(uri+`/${id}`, headers),
        post: (newRecord?: any, headers?: AxiosRequestConfig) => request.post(uri, newRecord, headers),
        delete: (id: string, headers?: AxiosRequestConfig) => request.delete(uri+`/${id}`, headers),
        patch: (updatedRecord?: any, headers?: AxiosRequestConfig) => request.patch(uri, updatedRecord, headers)
    }
}