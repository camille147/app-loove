export class Navbar {
    constructor(navigate) {
        this.navigate = navigate;
        this.currentView = 'dashboard';
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
            <nav class="fixed bottom-0 left-0 right-0 bg-base-100 text-base-content font-orbitron shadow-inner z-50 border-t border-gray-300">
                <div class="flex justify-around items-center py-2">
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="dashboard">
                        <i class="bi bi-house text-2xl"></i>
                        <span>Accueil</span>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="search">
                        <i class="bi bi-search text-2xl"></i>
                        <span>Search</span>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="albums">
                        <i class="bi bi-images text-2xl"></i>
                        <span>Albums</span>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="addAlbum">
                        <i class="bi bi-camera text-2xl"></i>
                        <span>Ajouter</span>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="profileUser">
                        <i class="bi bi-person text-2xl"></i>
                        <span>Profil</span>
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
            link.classList.toggle('text-error', isActive);
            link.classList.toggle('text-base-content', !isActive);
        });
    }

}