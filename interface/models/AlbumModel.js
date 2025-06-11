export class AlbumModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }

    async createAlbum({ title, description, creationDate, visibility, coverImageFile }) {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('creationDate', creationDate);
        formData.append('visibility', visibility);
        formData.append('img_profile_album', coverImageFile);  // <=== le fichier ici

        const response = await fetch(`http://app-loove-api.local/user/albums/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${token}`
                // Ne PAS mettre "Content-Type" ici !
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la création de l'album");
        }

        const data = await response.json();
        return data;
    }




    async getMyAlbums() {
        const token = localStorage.getItem("token")

        const response = await fetch(`http://app-loove-api.local/user/albums`, {
            method : "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            console.log("erreur create album")
            const errorData = await response.json()
            throw new Error(errorData.message || "Erreur lors recup utili")
        }


        const myAlbums = await response.json()
        return myAlbums.albums

    }

}

