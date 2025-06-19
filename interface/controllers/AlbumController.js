import {AlbumModel} from "../models/AlbumModel";
import {AddAlbumView} from "../views/AddAlbumView";
import {ProfileUserView} from "../views/ProfileUserView";
import {AlbumsView} from "../views/AlbumsView";
import {ModificationPhotoView} from "../views/ModificationPhotoView";
import {PhotosView} from "../views/PhotosView";
import {ModificationAlbumView} from "../views/ModificationAlbumView";

export class AlbumController {
    constructor(root, navigate, apiBaseUrl) {
        this.albumModel = new AlbumModel(apiBaseUrl);
        this.root = root
        this.navigate = navigate
    }

    async showCreateAlbumForm() {
        const view = new AddAlbumView(this.root, this.navigate);
        view.onSubmit = async (formData) => {
            try {
                await this.albumModel.createAlbum(formData);
                this.navigate("profileUser");
            } catch (e) {
                console.error("Erreur création album :", e.message);
                alert("Erreur : " + e.message);
            }
        };
        view.render();
    }

    async showAlbums(filter='all') {
        try {
            const albums = await this.albumModel.getAlbumsByFilter(filter);
            const view = new AlbumsView( this.root, this.navigate, albums);
            view.render();
        } catch (e) {
            console.error("Erreur chargement albums :", e.message);
            this.navigate("home");
        }
    }


    async showDeleteAlbum(albumId) {
        try {

            console.log("ok")
            const album = await this.albumModel.deleteAlbum(albumId)
            console.log("ok1")
            const albums = await this.albumModel.getAlbumsByFilter('all')
            console.log("ok2")

            const view = new AlbumsView(this.root, this.navigate, albums)
           // view.model = this.albumModel

            await view.render()
        } catch (e) {
            console.error("Erreur chargementalbums :", e.message);
            alert("Erreur chargementalbums: " + e.message);
            this.navigate("home");
        }


    }

    async showUpdateAlbum(albumId) {
        try {
            const album = await this.albumModel.getAlbum(albumId)

            const view = new ModificationAlbumView(this.root, this.navigate, album)
            view.onSubmit = async (formData) => {
                try {
                    await this.albumModel.modification(formData)
                    //console.log(photo.photo.album_id)
//vue rendu à modif
                    this.navigate(`photos/${album.album.id}`)
                } catch (e) {
                    alert("Erreur :" + e.message)
                }
            }

            view.render()

        } catch (e) {
            console.error("Erreur lors de la modification d'un album :", e.message)
            this.navigate("home")
        }
    }
}
