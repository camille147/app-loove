import {PhotoModel} from "../models/PhotoModel"
import {AddPhotoView} from "../views/AddPhotoView"
import {PhotosView} from "../views/PhotosView"
import {ModificationProfileView} from "../views/ModificationProfileView"
import {ModificationPhotoView} from "../views/ModificationPhotoView"
import {AlbumsView} from "../views/AlbumsView";
import {SearchView} from "../views/SearchView"


export class PhotoController {
    constructor(root, navigate, apiBaseUrl) {
        this.photoModel = new PhotoModel(apiBaseUrl);
        this.root = root
        this.navigate = navigate
    }

    async showAddPhotoForm(albumId) {
        const tags = await this.photoModel.getAllTags()
        const view = new AddPhotoView(this.root, this.navigate, albumId, tags)
        view.onSubmit = async (formData) => {
            try {
                await this.photoModel.createPhoto(formData)
                this.navigate(`photos/${albumId}`)
            } catch (e) {
                console.error("Erreur création photo :", e.message)
                alert("Erreur : " + e.message)
            }
        }
        await view.render()
    }

    async showPhotos(albumId, filters={}) {
        try {
            const albumInfo = await this.photoModel.getAlbum(albumId)
            const photos = await this.photoModel.getPhotosByAlbum(albumId)
            const view = new PhotosView(this.root, this.navigate, albumId, photos, albumInfo)
            view.model = this.photoModel

            view.onToggleFavorite = async (photoId, isFavorite) => {
                await this.photoModel.toggleFavorite(photoId, isFavorite)
                await view.applyFilters()
            }

            view.onToggleDelete = async (photoId) => {
                await this.photoModel.deletePhoto(photoId)
                await view.applyFilters()
            }
            await view.render()
        } catch (e) {
            console.error("Erreur chargement photos :", e.message)
            alert("Erreur chargement photos : " + e.message)
            this.navigate("home")
        }

    }

    async showModificationPhoto(photoId) {
        try {
            const photo = await this.photoModel.getInformations(photoId)
            const tags = await this.photoModel.getAllTags()
            const view = new ModificationPhotoView(this.root, this.navigate, photo, tags)
            view.onSubmit = async (formData) => {
                try {
                    await this.photoModel.modification(formData)
                    this.navigate(`photos/${photo.photo.album_id}`)
                } catch (e) {
                    alert("Erreur :" + e.message)
                }
            }
            view.render()

        } catch (e) {
            console.error("Erreur lors de la modification du profil :", e.message)
            this.navigate("home")
        }
    }

    async showSearchPhotos() {
        try {
            const tags = await this.photoModel.getSearchPhotos()
            const view = new SearchView( this.root, this.navigate, tags)
            view.render()
        } catch (e) {
            console.error("Erreur chargement tags recherche photo :", e.message)
            this.navigate("home")
        }
    }

}