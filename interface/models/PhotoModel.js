import {apiFetch} from "../js/utils/apiFetch";

export class PhotoModel {
    constructor(baseUrl) {
        this.baseUrl = baseUrl //http://app-loove-api.local
    }


    async getMyPhotos() {
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

    async getPhotosByAlbum(albumId, {order = 'all',tag = null,  favorite = false} = {} ) {
        const params = new URLSearchParams()

        params.append('album_id', albumId)

        if (tag) params.append('tag', tag)
        if (order !== 'all') params.append('order', order)
        if (favorite) params.append('favorite', "1")



        const response = await apiFetch(`${this.baseUrl}/user/album/photos?${params.toString()}`, {
            method : "GET",
            credentials: "include",
        })

        return response.photos
    }


        async createPhoto(formData) {
            return await apiFetch(`${this.baseUrl}/user/album/photos/create`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })
        }

    async toggleFavorite(photoId) {
        return await apiFetch(`${this.baseUrl}/user/album/photos/${photoId}/favorite`, {
            method: "PATCH",
            credentials: "include"
        })
    }

    async getAllTags() {
        const response = await apiFetch(`${this.baseUrl}/tags`, {
            method: "GET",
            credentials: "include"
        })
        return response.tags
    }


}