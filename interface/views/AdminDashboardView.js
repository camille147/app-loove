import {Navbar} from "../components/navbar";

export class AdminDashboardView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="min-h-screen bg-base-100 p-6">
                <h1 class="text-3xl font-bold text-center red-color mb-8">Tableau de bord Admin</h1>
                <div class="p-4">
                    <button class="btn btn-outline red-color mb-4" id="disconnectionAdmin">Se déconnecter</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" id="admin-dashboard-grid">
                    
                </div>
            </div>
        `
        this.bindEvents()
    }

    bindEvents() {

        const btnDisconnection = document.getElementById('disconnectionAdmin')
        btnDisconnection.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("logout")

        })
    }
}