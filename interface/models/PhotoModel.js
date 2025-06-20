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

    async getFavorites( ) {
        const response = await apiFetch(`${this.baseUrl}/user/albums/photos/favorite`, {
            method: "GET",
            credentials: "include"
        })
        return response.favorites
    }


        async createPhoto(formData) {
            return await apiFetch(`${this.baseUrl}/user/album/photos/create`, {
                method: "POST",
                body: formData,
                credentials: "include"
            })
        }

    async toggleFavorite(photoId, isFavorite) {
        const formData = new URLSearchParams()
        formData.append('photo_id', photoId)
        formData.append('favorite', isFavorite ? '1' : '0')

        return await apiFetch(`${this.baseUrl}/user/albums/photo/favorite`, {
            method: "POST",
            body: formData,
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    }

    async getAllTags() {
        const response = await apiFetch(`${this.baseUrl}/tags`, {
            method: "GET",
            credentials: "include"
        })
        return response.tags
    }

    async getAlbum(albumId) {
        const params = new URLSearchParams()
        params.append('album_id', albumId)
        const response = await apiFetch(`${this.baseUrl}/album?${params.toString()}`, {
            method: "GET",
            credentials: "include"
        })
        return response
    }

    async getInformations(photoId) {
        const params = new URLSearchParams()
        params.append('photo_id', photoId)

        return await apiFetch(`${this.baseUrl}/photo?${params.toString()}`, {
            method: "GET",
        })
    }

    async modification(photoDataModif){
        return await apiFetch(`${this.baseUrl}/user/album/photo/update`, {
            method: "POST",
            body: JSON.stringify(photoDataModif),
            headers: {"Content-Type" : "applications/json"}
        })
    }

    async deletePhoto(photoId) {
        const response = await apiFetch(`http://app-loove-api.local/user/album/photo/delete`, {
            method: "DELETE",
            body: JSON.stringify({ photo_id: photoId }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response
    }


    async getSearchPhotos(){
        const response = await apiFetch(`${this.baseUrl}/search/photo`, {
            method: "GET",
            credentials: "include"
        })
        return response.tags
    }

}