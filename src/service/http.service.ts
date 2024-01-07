import axios, { AxiosResponse } from 'axios';

class HttpService {
    private static readonly baseUrl: string = "http://13.214.211.212:3000/api/v1";
    private static token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDcyMTc2ODYsIkRhdGEiOnsiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInVzZXJfaWQiOiIxIn19.JeD3T0c0Gp0b7Rk2KZyHVF-wp5TDtU9RipOy4oOEBdI';

    public static setToken(token: string): void {
        this.token = token;
    }

    private static getHeaders(): object {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    public static async get<T>(endpoint: string, params?: object): Promise<AxiosResponse<T>> {
        return axios.get<T>(this.baseUrl + endpoint, { 
            params,
            headers: this.getHeaders()
        });
    }

    public static async post<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
        return axios.post<T>(this.baseUrl + endpoint, data, {
            headers: this.getHeaders()
        });
    }

    public static async put<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
        return axios.put<T>(this.baseUrl + endpoint, data, {
            headers: this.getHeaders()
        });
    }

    public static async patch<T>(endpoint: string, data?: object): Promise<AxiosResponse<T>> {
        console.log(data, "???????????????????");
        return axios.patch<T>(this.baseUrl + endpoint, data, {
          headers: this.getHeaders()
        });
      }

    public static async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
        return axios.delete<T>(this.baseUrl + endpoint, {
            headers: this.getHeaders()
        });
    }
}

export default HttpService;