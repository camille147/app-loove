export class UserModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }

    async login(email, password) {
        const response = await fetch(`http://app-loove-api.local/login`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ email, password }),
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Erreur serveur")
        }

        const data = await response.json()
        localStorage.setItem("token", data.token)
        return data
    }

    async signIn({ username, email, password, profile_picture_file, bio }) {

        const formData = new FormData()
        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("bio", bio)
        formData.append("photo", profile_picture_file)


        const response = await fetch(`http://app-loove-api.local/register`, {
            method: "POST",
            credentials: "include",
            body: formData,
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || "erreur lors de l'inscription")
        }

        const data = await response.json()
        return data
    }



    async me() {
        const token = localStorage.getItem("token")
        //console.log(token)
        const response = await fetch(`http://app-loove-api.local/me`, {
            method: "GET",
            credentials: "include",
            headers:  {
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            console.log("erreur me")
            const errorData = await response.json()
            throw new Error(errorData.message || "Erreur lors recup utili")
        }

        const user = await response.json()
        return user
    }

    async logout() {
        const token = localStorage.getItem("token")

        const response = await fetch(`http://app-loove-api.local/logout`, {
            method: "GET",
            credentials: "include",
            headers:  {
                "Authorization": `Bearer ${token}`
            },
        })
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "erreur lor deco")
        }

        const data = await response.json()
        return data
    }





}

