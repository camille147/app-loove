export class Navbar {
    constructor(navigate) {
        this.navigate = navigate;
        this.curentView = 'dashboard';
    }

    setActiveView(view) {
        this.currentView = view;
        this.updateActiveLink();
    }

    mount(container) {
        container.innerHTML = this.render()
        this.addEvents()
    }

    render () {
        return `
            <nav class="navbar bottom-nav navbar-light">
                <div class="container-fluid justify-content-around">
                    <a href="#" class="nav-link text-center" data-view="dashboard">
                        <i class="bi bi-house"></i>
                        <p>Accueil</p>
                    </a>
                    <a href="#" class="nav-link text-center" data-view="albums">
                        <i class="bi bi-images"></i>
                        <p>Albums</p>
                    </a>
                    <a href="#" class="nav-link text-center" data-view="addAlbum">
                        <i class="bi bi-camera"></i>
                        <p>Ajouter</p>
                    </a>
                    <a href="#" class="nav-link text-center" data-view="profileUser">
                        <i class="bi bi-person"></i>
                        <p>Profil</p>
                    </a>
                </div>
            </nav>
        `
    }
    addEvents() {
        document.querySelectorAll('.nav-link[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                this.navigate(view);
                this.setActiveView(view);
            });
        });
        this.updateActiveLink();
    }

    updateActiveLink() {
        document.querySelectorAll('.nav-link[data-view]').forEach(link => {
            const isActive = link.getAttribute('data-view') === this.currentView;
            link.classList.toggle('active', isActive);
        });
    }

}