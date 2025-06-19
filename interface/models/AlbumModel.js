import {apiFetch} from "../js/utils/apiFetch";

export class AlbumModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }

    async createAlbum({ title, description, creationDate, visibility, coverImageFile }) {

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('creationDate', creationDate);
        formData.append('visibility', visibility);
        formData.append('img_profile_album', coverImageFile);  // le fichier ici

        return await apiFetch(`${this.baseUrl}/user/albums/create`, {
            method: "POST",
            body: formData,
        })
    }




    async getMyAlbums() {
        const token = localStorage.getItem("token")

        const response = await fetch(`http://app-loove-api.local/user/albums?filter=private`, {
            method : "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            console.log("erreur recup album privé")
            const errorData = await response.json()
            throw new Error(errorData.message || "Erreur lors recup album privé")
        }

        const myAlbums = await response.json()
        return myAlbums.albums

    }

    async getAlbumsByFilter(filter = 'all') {
        const token = localStorage.getItem("token")

        const response = await fetch(`http://app-loove-api.local/user/albums?filter=${filter}`, {
            method : "GET",
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            console.log("erreur recup album filtrer")
            const errorData = await response.json()
            throw new Error(errorData.message || "Erreur lors recup albums filtrés")
        }

        const myAlbums = await response.json()
        return myAlbums.albums
    }


    async modification(formData){
        return await apiFetch(`${this.baseUrl}/user/album/update`, {
            method: "POST",
            body: formData,
        })
    }

    async getAlbum(albumId) {
        const params = new URLSearchParams();
        params.append('album_id', albumId);
        const response = await apiFetch(`${this.baseUrl}/album?${params.toString()}`, {
            method: "GET",
            credentials: "include"
        })
        //console.log(response)
        return response
    }

    async deleteAlbum(albumId) {
        const response = await apiFetch(`http://app-loove-api.local/user/album/delete`, {
            method: "DELETE",
            body: JSON.stringify({ album_id: albumId }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    }

}

