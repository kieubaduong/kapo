class ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string | null;

    constructor(success: boolean, data: T | null = null, message: string | null = null) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    static success<T>(data: T): ApiResponse<T> {
        return new ApiResponse<T>(true, data, null);
    }

    static fail<T>(message: string): ApiResponse<T> {
        return new ApiResponse<T>(false, null, message);
    }
}

export default ApiResponse;