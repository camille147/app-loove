export class UserModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }

    async login(email, password) {
        const response = await fetch(`http://app-loove-api.local/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Erreur serveur")
        }

        const data = await response.json()
        return data
    }





}

