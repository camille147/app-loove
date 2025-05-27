import { UserModel } from "../models/UserModel.js";
import { ConnectionView } from "../views/ConnectionView.js";

export class AuthController {
    constructor(root, navigate, apiBaseUrl) {
        this.userModel = new UserModel(apiBaseUrl);
        this.view = new ConnectionView(root, navigate);
    }

    showLogin() {
        this.view.render()

        this.view.onSubmit = async ({ email, password }) => {
            try {
                const result = await this.userModel.login(email, password);

                this.view.showMessage("Connexion réussie !", "success")

                //localStorage.setItem("token", result.token);

                this.view.navigate("dashboard")
            } catch (err) {
                this.view.showMessage(err.message || "Erreur de connexion", "danger");
            }
        };
    }

}
