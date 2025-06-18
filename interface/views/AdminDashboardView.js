import {Navbar} from "../components/navbar";
import {PhotoListComponent} from "../components/PhotoListComponent";
import {UserListComponent} from "../components/UserListComponent";

export class AdminDashboardView {
    constructor(root, navigate, users) {
        this.root = root
        this.navigate = navigate
        this.users = users
        this.onToggleDelete = null;
    }

    render() {
        const userListComponent = new UserListComponent(this.users, this.deleteUserBtn.bind(this))

        this.root.innerHTML = `
            <div class="min-h-screen bg-base-100 p-6">
                <h1 class="text-3xl font-bold text-center red-color mb-8">Tableau de bord Admin</h1>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="admin-dashboard-grid">
                    
                </div>
                <div id="userListContainer">
                    ${userListComponent.render()}
                </div>
            </div>
        `

        this.userListComponent = userListComponent
        this.bindEvents()
        this.userListComponent.bindEvents(this.root.querySelector('#userListContainer'))
    }

    bindEvents() {

    }

    async deleteUserBtn(userId){
        if (this.onToggleDelete) {
            await this.onToggleDelete(userId)
        }
    }
}