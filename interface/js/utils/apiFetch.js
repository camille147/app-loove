export async function apiFetch(url, options = {}) {
    const token = localStorage.getItem("token")
    const headers = options.headers || {}
    if(token) {
        headers["Authorization"] = `Bearer ${token}`
    }
    const response = await fetch(url, {
        credentials: 'include',
        ...options,
        headers,
    })

    if (response.status === 401) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("lastView")
        alert("Session expirée, vous avez été déconnecté")
        this.navigate("home")
        throw new Error("Session expirée")
    }

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erreur serveur")
    }

    return await response.json()
}