import { UserModel } from "../models/UserModel.js";
import { ConnectionView } from "../views/ConnectionView.js";
import {SignInView} from "../views/SignInView";
import {HomeView} from "../views/HomeView";
import {AddAlbumView} from "../views/AddAlbumView";

export class AuthController {
    constructor(root, navigate, apiBaseUrl) {
        this.userModel = new UserModel(apiBaseUrl);
        this.root = root
        this.navigate = navigate
    }

    showLogin() {

        const view = new HomeView(this.root, this.navigate)
        view.render()

        view.onSubmit = async ({ email, password }) => {
            try {
                const result = await this.userModel.login(email, password)
                const role = result.user.role
                const token  = result.token
                view.showMessage("Connexion réussie !", "success")

                localStorage.setItem("token", token)
                localStorage.setItem("user", JSON.stringify(result.user))

                if (role === 0) {
                    view.navigate("dashboard")
                } else {
                    view.navigate("adminDashboard")
                }
            } catch (err) {
                view.showMessage(err.message || "Erreur de connexion", "danger");
            }
        };
    }

    showSignIn() {
        const view = new SignInView(this.root, this.navigate)


        view.onSubmit = async (formData) => {
            try {
                await this.userModel.signIn(formData);
                view.showMessage("Inscription réussie ! Redirection en cours...");
                setTimeout(() => this.navigate("home"), 1500);
            } catch (err) {
                view.showMessage(err.message || "Erreur lors de l'inscription");

            }
        }
        view.render()
    }


    showLogout(){

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        const view = new HomeView(this.root, this.navigate)
        view.render()


    }

}
