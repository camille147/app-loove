import {AdminModel} from "../models/AdminModel";
import {PhotosView} from "../views/PhotosView";
import {AdminDashboardView} from "../views/AdminDashboardView";
import {AlbumsView} from "../views/AlbumsView";
import {SignInView} from "../views/SignInView";
import {AdminCreationAdminView} from "../views/AdminCreationAdminView";
import {ProfileUserView} from "../views/ProfileUserView";
import {AdminProfileView} from "../views/AdminProfileView";

export class AdminController {
    constructor(root, navigate, apiBaseUrl) {
        this.adminModel = new AdminModel(apiBaseUrl);
        this.root = root
        this.navigate = navigate
    }

    async showAdmin() {

        try {
            const users = await this.adminModel.getUsers();
            const view = new AdminDashboardView( this.root, this.navigate, users);

            view.onToggleDelete = async (userId) => {
                await this.adminModel.deleteAdmin(userId);
                await this.showAdmin()
            }

            view.render();
        } catch (e) {
            console.error("Erreur chargement users :", e.message);
            this.navigate("home");
        }


    }

    async showTagsAndCreate () {
        try {
            const tags = await this.adminModel.getTags();
            const view = new AdminTagsCreateView(this.root, this.navigate, tags)

            //A FINIR
        }catch (e) {
            console.error("Erreur chargement tags et/ou création :", e.message)
            this.navigate("home")
        }
    }

    async showCreateAdmin() {
        try {
            const view = new AdminCreationAdminView(this.root, this.navigate)


            view.onSubmit = async (formData) => {
                try {
                    await this.adminModel.creationAdmin(formData);
                    view.showMessage("Inscription admin réussie ! Redirection en cours...");
                    this.navigate("adminDashboard")

                } catch (err) {
                    view.showMessage(err.message || "Erreur lors de l'inscription admmin");

                }
            }
            view.render()

        }catch (e) {
            console.error("Erreur creation admin :", e.message)
            this.navigate("home")
        }
    }

    async showProfileAdmin() {
        try {
            const userAdmin = await this.adminModel.me()

            const view = await new AdminProfileView(this.root, this.navigate, userAdmin)
            view.render()

        }catch (e) {
            console.error("Erreur admin profil :", e.message)
            this.navigate("home")
        }
    }


}