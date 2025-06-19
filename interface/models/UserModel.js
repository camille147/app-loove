import {apiFetch} from "../js/utils/apiFetch";

export class UserModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }

    async getFavorites( ) {
        const response = await apiFetch(`${this.baseUrl}/user/albums/photos/favorite`, {
            method: "GET",
            credentials: "include"
        })
        return response.favorites
    }
}