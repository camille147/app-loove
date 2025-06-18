import {apiFetch} from "../js/utils/apiFetch";

export class AdminModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    async getUsers() {
        const response = await apiFetch(`${this.baseUrl}/admin`, {
            method: "GET",
            credentials: "include"
        })
        return response.users
    }

    async createTag(name) {
        const response = await apiFetch(`http://app-loove-api.local/admin/tag/new`, {
            method: "POST",
            body: JSON.stringify({name}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    }

    async getTags(){
        const response = await apiFetch(`${this.baseUrl}/admin/tags`, {
            method: "GET",
            credentials: "include"
        })
        return response.tags
    }


    async deleteAdmin(userId) {
        const body = new URLSearchParams()
        console.log(userId)
        body.append("user_id", userId)


        const response = await apiFetch(`http://app-loove-api.local/admin/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),

        });
        console.log(response)
        return response;
    }

    async creationAdmin({ username, email, password, profile_picture_file, bio }) {
        const formData = new FormData()
        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("bio", bio)
        formData.append("photo", profile_picture_file)


        return await apiFetch(`${this.baseUrl}/admin/new`, {
            method: "POST",
            body: formData,
        })
    }

    async me() {
        return await apiFetch(`${this.baseUrl}/me`, {
            method: "GET",
        })
    }

}