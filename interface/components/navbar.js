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
            <nav class="fixed bottom-0 left-0 right-0 bg-black text-white font-orbitron shadow-inner z-50">
                <div class="flex justify-around items-center py-3">
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-red-500 transition" data-view="dashboard">
                        <i class="bi bi-house text-xl"></i>
                        <p>Accueil</p>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-red-500 transition" data-view="search">
                        <i class="bi bi-search text-xl"></i>
                        <p>Search</p>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-red-500 transition" data-view="albums">
                        <i class="bi bi-images text-xl"></i>
                        <p>Albums</p>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-red-500 transition" data-view="addAlbum">
                        <i class="bi bi-camera text-xl"></i>
                        <p>Ajouter</p>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-red-500 transition" data-view="profileUser">
                        <i class="bi bi-person text-xl"></i>
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
            link.classList.toggle('text-red-500', isActive);
            link.classList.toggle('text-white', !isActive);
        });
    }

}