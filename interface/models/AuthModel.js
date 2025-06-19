import {apiFetch} from "../js/utils/apiFetch";

export class AuthModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }

    async login(email, password) {
        const response = await apiFetch(`http://app-loove-api.local/login`, {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json",
            }
        })

        localStorage.setItem("token", response.token)
        return response
    }

    async delete() {
        const response = await apiFetch(`http://app-loove-api.local/user/profile/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    }

    async signIn({ username, email, password, profile_picture_file, bio }) {

        const formData = new FormData()
        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("bio", bio)
        formData.append("photo", profile_picture_file)


        return await apiFetch(`${this.baseUrl}/register`, {
            method: "POST",
            body: formData,
        })
    }



    async me() {
        return await apiFetch(`${this.baseUrl}/me`, {
            method: "GET",
        })
    }

    async logout() {
        return await apiFetch(`${this.baseUrl}/logout`, {
            method: "GET",
        })
    }

    async modification(formData){
        return await apiFetch(`${this.baseUrl}/user/profile/update`, {
            method: "POST",
            body: formData,
        })
    }

}

