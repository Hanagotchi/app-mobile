import { AxiosInstance } from "axios";

export interface HanagotchiApi {
    logIn: (authCode: string) => void;
}

export class HanagotchiApiImpl implements HanagotchiApi {
    private axiosInstance: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
      this.axiosInstance = axiosInstance;
    }

    // TODO
    async logIn(authCode: string) {
        console.log(`Request LOG IN to Hanagothci API with auth code: ${authCode}`);
    }
}