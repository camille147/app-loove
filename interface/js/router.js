import { HomeView } from '../views/HomeView'
import { ConnectionView } from "../views/ConnectionView"
import {SignInView} from "../views/SignInView";
import {AuthController} from "../controllers/AuthController";
import {DashboardUserView} from "../views/DashboardUserView";
import {ProfileUserView} from "../views/ProfileUserView";
import {AddAlbumView} from "../views/AddAlbumView";
import {AlbumsView} from "../views/AlbumsView";
import {SearchView} from "../views/SearchView";
import {AdminUsersView} from "../views/AdminUsersView";
import {AdminDashboardView} from "../views/AdminDashboardView";
import {ProfileController} from "../controllers/ProfileController";
import {AlbumListComponent} from "../components/AlbumListComponent";
import {NavBarAdminComponent} from "../components/NavBarAdminComponent";

import {AlbumController} from "../controllers/AlbumController";
import {PhotoController} from "../controllers/PhotoController";
import {AdminController} from "../controllers/AdminController";
import {UserController} from "../controllers/UserController";

export class Router {
    constructor(root, apiBaseUrl) {
        this.root = root
        this.apiBaseUrl = apiBaseUrl
        this.navbar = null
        this.navBarAdmin = null

        this.routes = {
            //home: () => new HomeView(this.root, this.navigate.bind(this)).render(),   // permet de passer la func ds les vues sans perdre le this du router
            home: () => {
                const authController = new AuthController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                authController.showLogin()
                //new ConnectionView(this.root, this.navigate.bind(this)).render(),
            },
            signin : () => {
                const authController = new AuthController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                authController.showSignIn()
            },
            dashboard : () => {
                const userController = new UserController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                userController.showFavorites()
            },
            adminDashboard : () => {
                const adminController = new AdminController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                adminController.showAdmin()
            },
            adminTags : () => {
                const adminController = new AdminController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                adminController.showTagsAndCreate()
            },
            adminCreateAdmin : () => {
                const adminController = new AdminController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                adminController.showCreateAdmin()
            },
            adminProfile : () => {
                const adminController = new AdminController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                adminController.showProfileAdmin()
            },
            profileUser : () => {
                const profileController = new ProfileController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                profileController.showProfile()
            },
            logout: () => {
                const authController = new AuthController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                authController.showLogout()
            },
            addAlbum: () => {
                const albumController = new AlbumController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                albumController.showCreateAlbumForm()
            },
            myAlbums : () => {
                const controller = new AlbumController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                controller.showUserAlbums();
            },
            albums: () => {
                const controller = new AlbumController(this.root, this.navigate.bind(this), this.apiBaseUrl )
                controller.showAlbums()
            },
            modification: () => {
                const profileController = new ProfileController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                profileController.showModificationProfile()
            },
            menu: () => {
                const profileController = new ProfileController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                profileController.showMenu()
            },
            delete: () => {
                const profileController = new ProfileController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                profileController.showDelete()
            },
            deleteAlbum: (albumId) => {
                const albumController = new AlbumController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                albumController.showDeleteAlbum(albumId)
            },
            updateAlbum: (albumId) => {
                const albumController = new AlbumController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                albumController.showUpdateAlbum(albumId)
            },
            photos: (albumId) => {
                const controller = new PhotoController(this.root, this.navigate.bind(this), this.apiBaseUrl);
                controller.showPhotos(albumId);
            },
            search: () => {
                const controller = new PhotoController(this.root, this.navigate.bind(this), this.apiBaseUrl);
                controller.showSearchPhotos();
            },

            addPhoto: (albumId) => {
                const controller = new PhotoController(this.root, this.navigate.bind(this), this.apiBaseUrl);
                controller.showAddPhotoForm(albumId);
            },
            modificationPhoto: (photoId) => {
                const controller = new PhotoController(this.root, this.navigate.bind(this), this.apiBaseUrl);
                controller.showModificationPhoto(photoId);
            },
            photo: () => {
                const photoController = new PhotoController(this.root, this.navigate.bind(this), this.apiBaseUrl)
                photoController.showInformations()
            },




        }
    }

    navigate(viewName) {
        // Ex: viewName = "photos/123" ou "addPhoto/123"
        const [route, param] = viewName.split('/');

        const routeHandler = this.routes[route];

        if (routeHandler) {
            if (param) {
                routeHandler(param);
            } else {
                routeHandler();
            }

            localStorage.setItem('lastView', viewName)

            const user = this.getUSer()
            const isConnected = this.isAuthentificated()
            const isAdmin = user?.role === 1
            const navbarContainer = document.getElementById("navbar");
            const navBarAdminContainer = document.getElementById("navBarAdmin");
const mainContent = document.getElementById("app")

            if (this.navbar) {
                if (isConnected && !isAdmin) {
                    this.navbar.mount(navbarContainer);
                    this.navbar.setActiveView(route);  // attention : ici route sans param
                } else {
                    this.navbar.unmount(navbarContainer);
                }
            }


            if (isAdmin) {
                if (!this.navBarAdmin) {
                    this.navBarAdmin = new NavBarAdminComponent(this.navigate.bind(this))
                }
                this.navBarAdmin.mount(navBarAdminContainer)
            } else if (this.navBarAdmin) {
                this.navBarAdmin.unmount(navBarAdminContainer)
                this.navBarAdmin = null
            }

        } else {
            this.root.innerHTML = "<h1>404 - Vue inconnue</h1>";
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


    isAuthentificated() {
        const token = localStorage.getItem("token")
        return !!token
    }

    getUSer() {
        const user = localStorage.getItem("user")
        if (!user) return null

        try {
            return JSON.parse(user)
        } catch (error) {
            return null
        }

    }

    setNavbar(navbar) {
        this.navbar = navbar
    }

    start(defaultView = 'home') {
        this.initNavigation()

        const lastView = localStorage.getItem('lastView') || defaultView
        if (!this.isAuthentificated() && lastView !== 'home' && lastView !== 'signin') {
            this.navigate('home')
        } else {
            this.navigate(lastView)
        }
    }
}