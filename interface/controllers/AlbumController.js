import {AlbumModel} from "../models/AlbumModel";
import {AddAlbumView} from "../views/AddAlbumView";
import {ProfileUserView} from "../views/ProfileUserView";

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

    async showUserAlbums() {
        // CHANGER PROFILE USER VIEW POUR PRENDRE ALBUMS ET USER
        try {
            const albums = await this.albumModel.getMyAlbums();
            const view = new ProfileUserView( this.root, this.navigate, user, albums);
            view.render();
        } catch (e) {
            console.error("Erreur chargement albums :", e.message);
            this.navigate("home");
        }
    }
}
