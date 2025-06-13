import {AlbumModel} from "../models/AlbumModel";
import {AddAlbumView} from "../views/AddAlbumView";
import {ProfileUserView} from "../views/ProfileUserView";
import {AlbumsView} from "../views/AlbumsView";

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
}
