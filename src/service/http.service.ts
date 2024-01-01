import axios, { AxiosResponse } from 'axios';

class HttpService {
    private static readonly baseUrl: string = "http://13.214.211.212:3000/api/v1";
    private static token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDY1MjE0OTMsIkRhdGEiOnsiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJfaWQiOiIxIn19.zs8LQ4EIfzhyTKga-_ASxnP_35XlkB8qI5dsnHctuL4';

    public static setToken(token: string): void {
        this.token = token;
    }

    public static async get<T>(endpoint: string, params?: object): Promise<AxiosResponse<T>> {
        return axios.get<T>(this.baseUrl + endpoint, { 
            params,
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
    }

    public static async post<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
        return axios.post<T>(this.baseUrl + endpoint, data, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
    }

    public static async put<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
        return axios.put<T>(this.baseUrl + endpoint, data, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });
    }
}

export default HttpService;