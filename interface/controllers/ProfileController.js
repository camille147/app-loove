import {UserModel} from "../models/UserModel";
import {ConnectionView} from "../views/ConnectionView";
import {ProfileUserView} from "../views/ProfileUserView";

export class ProfileController {
    constructor(root, navigate, apiBaseUrl) {
        this.userModel = new UserModel(apiBaseUrl);
        this.root = root
        this.navigate = navigate
    }

    async showProfile (){
        try {
            console.log("a passe")
            const user = await this.userModel.me()
            //console.log(user['user'])
            const view = await new ProfileUserView(this.root, this.navigate, user)
        //console.log("avant render")
            view.render()
            //console.log("passe")
            console.log(user)

        }catch (e) {
            console.error("Erreur lors de la récupération du profil :", e.message)
            this.navigate("home")
        }
    }


}