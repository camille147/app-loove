import {PhotoModel} from "../models/PhotoModel";
import {AddPhotoView} from "../views/AddPhotoView";
import {PhotosView} from "../views/PhotosView";


export class PhotoController {
    constructor(root, navigate, apiBaseUrl) {
        this.photoModel = new PhotoModel(apiBaseUrl);
        this.root = root
        this.navigate = navigate
    }

    async showAddPhotoForm(albumId) {
        const view = new AddPhotoView(this.root, this.navigate, albumId);
        view.onSubmit = async (formData) => {
            try {
                await this.photoModel.createPhoto(formData)
                this.navigate(`photos/${albumId}`);
            } catch (e) {
                console.error("Erreur création photo :", e.message);
                alert("Erreur : " + e.message);            }
        };
        await view.render()
    }

    async showPhotos(albumId, filters={}) {
        try {
            const photos = await this.photoModel.getPhotosByAlbum(albumId)
            const view = new PhotosView( this.root, this.navigate, albumId, photos)
            view.model = this.photoModel
            view.onToggleFavorite = async (photoId) => {
                await this.photoModel.toggleFavorite(photoId);
                await view.applyFilters()
            }
            await view.render()
        } catch (e) {
            console.error("Erreur chargement photos :", e.message);
            alert("Erreur chargement photos : " + e.message);
            this.navigate("home");
        }
    }
}