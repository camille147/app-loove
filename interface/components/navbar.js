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
                        <i class="fa-solid fa-house text-xl red-color"></i>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="search">
                        <i class="fa-solid fa-magnifying-glass text-xl red-color"></i>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="albums">
                        <i class="fas fa-images text-xl red-color"></i>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="addAlbum">
                        <i class="fas fa-camera text-xl red-color"></i>
                    </a>
                    <a href="#" class="nav-link flex flex-col items-center text-xs hover:text-error transition" data-view="profileUser">
                        <i class="fa-solid fa-user text-xl red-color"></i>
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
            link.classList.toggle('red-color', isActive);
            link.classList.toggle('text-base-content', !isActive);
        });
    }

}