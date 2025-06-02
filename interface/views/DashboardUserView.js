import {Navbar} from "../components/navbar";

export class DashboardUserView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="min-h-screen bg-base-100 p-6">
                <h1 class="text-3xl font-bold text-center red-color mb-8">Tableau de bord</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="user-dashboard-grid">
                    
                </div>
            </div>
        `
    }

}