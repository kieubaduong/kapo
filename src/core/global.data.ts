import { User } from "src/models/user";
import HttpService from "src/service/http.service";

class GlobalData {
    private static instance: GlobalData;
    public user: User | null = null;

    private constructor() { }

    public static getInstance(): GlobalData {
        if (!GlobalData.instance) {
            GlobalData.instance = new GlobalData();
        }
        return GlobalData.instance;
    }

    public clear(): void {
        this.user = null;
        HttpService.setToken('');
    }
}

export default GlobalData;