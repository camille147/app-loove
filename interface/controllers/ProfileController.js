import {UserModel} from "../models/UserModel";
import {AlbumModel} from "../models/AlbumModel";

import {ConnectionView} from "../views/ConnectionView";
import {ProfileUserView} from "../views/ProfileUserView";
import {ModificationProfileView} from "../views/ModificationProfileView";

export class ProfileController {
    constructor(root, navigate, apiBaseUrl) {
        this.userModel = new UserModel(apiBaseUrl)
        this.root = root
        this.navigate = navigate

        this.albumModel = new AlbumModel(apiBaseUrl)
        this.userModel = new UserModel(apiBaseUrl)

    }

    async showProfile (){
        try {
            const user = await this.userModel.me()

            const albums = await this.albumModel.getMyAlbums()
            //console.log(albums)
            //console.log(user['user'])
            const view = await new ProfileUserView(this.root, this.navigate, user, albums)
            //console.log("avant render")
            view.render()
            //console.log("passe")
            //console.log(user)

        }catch (e) {
            console.error("Erreur lors de la récupération du profil :", e.message)
            this.navigate("home")
        }
    }

    async showModificationProfile() {
        try {
            const user = await this.userModel.me()

            const view = new ModificationProfileView(this.root, this.navigate, user)
            view.onSubmit = async (formData) => {
                try {
                    await this.userModel.modification(formData)
                    this.navigate("profileUser")
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