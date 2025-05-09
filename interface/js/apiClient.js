// js/apiClient.js
export class ApiClient {
    constructor() {
        this.baseUrl = "http://app-loove-api.local"; // L'URL de ton API backend
    }

    async get(endpoint) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`);

        // Vérifier si la réponse est bien du JSON
        const textResponse = await response.text(); // Lire la réponse comme texte brut
        try {
            const jsonResponse = JSON.parse(textResponse); // Essayer de parser en JSON
            return jsonResponse;
        } catch (error) {
            console.error("Erreur lors du parsing du JSON : ", error);
            console.log("Réponse brute : ", textResponse); // Afficher la réponse brute
            throw error; // Propager l'erreur
        }
    }

    async post(endpoint, data) {
        const response = await fetch(`${this.baseUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        // Vérifier si la réponse est bien du JSON
        const textResponse = await response.text(); // Lire la réponse comme texte brut
        try {
            const jsonResponse = JSON.parse(textResponse); // Essayer de parser en JSON
            return jsonResponse;
        } catch (error) {
            console.error("Erreur lors du parsing du JSON : ", error);
            console.log("Réponse brute : ", textResponse); // Afficher la réponse brute
            throw error; // Propager l'erreur
        }
    }
}
