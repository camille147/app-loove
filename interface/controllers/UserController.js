import {UserModel} from "../models/UserModel"
import {DashboardUserView} from "../views/DashboardUserView"

export class UserController {
    constructor(root, navigate, apiBaseUrl) {
        this.userModel = new UserModel(apiBaseUrl)
        this.root = root
        this.navigate = navigate
    }

    async showFavorites () {
        try {
            const favorites = await this.userModel.getFavorites()

            const publicsAlbums = await this.userModel.getPublicsAlbums()
            const albumsRecents = await this.userModel.getRecentsAlbums()
            const view = new DashboardUserView(this.root, this.navigate, favorites, publicsAlbums, albumsRecents)

            view.render()

        } catch (e) {
            console.error("Erreur chargement photos favorites :", e.message)
            this.navigate("home")
        }
    }
}
