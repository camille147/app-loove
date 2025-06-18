import {UserModel} from "../models/UserModel";
import {AlbumModel} from "../models/AlbumModel";

import {ConnectionView} from "../views/ConnectionView";
import {ProfileUserView} from "../views/ProfileUserView";
import {ModificationProfileView} from "../views/ModificationProfileView";
import {MenuUserView} from "../views/MenuUserView";
import {HomeView} from "../views/HomeView";
import {SignInView} from "../views/SignInView";

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
            const view = await new ProfileUserView(this.root, this.navigate, user, albums)
            view.render()

        }catch (e) {
            console.error("Erreur lors de la récupération du profil :", e.message)
            this.navigate("home")
        }
    }

    async showMenu (){

            const view = await new MenuUserView(this.root, this.navigate)
            view.render()

    }


    async showModificationProfile() {
        try {
            const user = await this.userModel.me()

            const view = new ModificationProfileView(this.root, this.navigate, user)
            view.onSubmit = async (formData) => {
                try {
                    await this.userModel.modification(formData)
                    if (user.user.role === 0) {
                        this.navigate("profileUser")

                    } else {
                        console.log(user)
                        this.navigate("adminProfile")

                    }
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

    async showDelete() {
        const view = new MenuUserView(this.root, this.navigate)

            try {
                //const user = await this.userModel.me();
                await this.userModel.delete();
                view.showMessage("Suppression réussie ! Redirection en cours...");
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                localStorage.removeItem("lastView")

                setTimeout(() => this.navigate("home"), 1500);

            } catch (err) {
                view.showMessage(err.message || "Erreur lors de la suppression");
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