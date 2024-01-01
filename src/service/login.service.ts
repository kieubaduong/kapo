import ApiResponse from 'src/models/api.response';
import HttpService from './http.service';
import { User } from 'src/models/user';
import GlobalData from 'src/core/global.data';

interface LoginResponse {
    message: string;
    data: {
        id: number;
        username: string;
        email: string;
    };
    meta: {
        token: string;
    };
}

class LoginService {
    public static async login(email: string, password: string): Promise<ApiResponse<any>> {
        const endpoint = '/auth/login';
        const data = { email, password };
        try {
            const response = await HttpService.post(endpoint, data);
            const responseData = response.data as LoginResponse;
            const user = new User(responseData.data.id, responseData.data.username, responseData.data.email);
            const token = responseData.meta.token;

            // Store user and token in GlobalData
            const globalData = GlobalData.getInstance();
            globalData.user = user;
            HttpService.setToken(token);

            return ApiResponse.success(responseData);
        } catch (error) {
            console.error('Error during login:', error);
            return ApiResponse.fail('Login failed');
        }
    }
}

export default LoginService;