import { HomeView } from '../views/HomeView'
import { ConnectionView } from "../views/ConnectionView"
import {SignInView} from "../views/SignInView";
import {AuthController} from "../controllers/AuthController";

export class Router {
    constructor(root, apiBaseUrl) {
        this.root = root
        this.apiBaseUrl = apiBaseUrl
        this.routes = {
            home: () => new HomeView(this.root, this.navigate.bind(this)).render(),   // permet de passer la func ds les vues sans perdre le this du router
            connection: () => {
                const authController = new AuthController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                authController.showLogin()
                //new ConnectionView(this.root, this.navigate.bind(this)).render(),
            },
            signin : () => new SignInView(this.root, this.navigate.bind(this)).render(),

        }
    }

    navigate(viewName) {
        const view = this.routes[viewName]
        if (view) {
            view()
        } else {
            this.root.innerHTML = "<h1>404 - Vue inconnue</h1>"
        }
    }

    initNavigation() {
        document.querySelectorAll('button[data-view]').forEach(button => {
            button.addEventListener('click', () => {
                const view = button.getAttribute('data-view')
                this.navigate(view)
            })
        })
    }

    start(defaultView = 'home') {
        this.initNavigation()
        this.navigate(defaultView)
    }
}