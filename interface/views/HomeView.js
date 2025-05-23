export class HomeView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                <div class="logo-container mb-4">
                    
                    <h1 class="logo-text">HeartBloom</h1>
                </div>

                <div class="w-100 px-4" style="max-width: 320px;">
                    <button class="btn btn-primary custom-btn-1 w-100 mb-3" data-view="connection" id="connection"> Se connecter </button>
                    <button class="btn custom-btn-2 w-100" data-view="signIn" id="signIn"> S'inscrire </button>
                </div>
            </div>
        `;
        this.bindEvents()
    }

    bindEvents() {
        document.getElementById('connection').addEventListener('click', () => {
            this.navigate("connection");
        })
        document.getElementById('signIn').addEventListener('click', () => {
            this.navigate("signin");
        });
    }

}
