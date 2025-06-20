export class Navbar {
    constructor(navigate) {
        this.navigate = navigate
        this.currentView = 'dashboard'
    }

    setActiveView(view) {
        this.currentView = view
        this.updateActiveLink()
    }

    mount(container) {
        container.innerHTML = this.render()
        this.addEvents()
    }

    unmount(container) {
        if (container) {
            container.innerHTML =""
        }
    }

    render () {
        return `
            <div class="fixed inset-x-0 bottom-6 flex justify-center z-50">
              <nav class="bg-white/70 backdrop-blur-md shadow-xl rounded-full px-6 py-3 border border-white/40 max-w-md w-full mx-auto">
                <div class="flex justify-around items-center w-full text-[1.2rem] black-color font-orbitron">
                  
                  <a href="#" class="nav-link flex items-center justify-center" data-view="dashboard">
                    <i class="fa-solid fa-house text-xl"></i>
                  </a>
            
                  <a href="#" class="nav-link flex items-center justify-center" data-view="search">
                    <i class="fa-solid fa-magnifying-glass text-xl"></i>
                  </a>
                  
                    <a href="#" class="nav-link flex items-center justify-center" data-view="addAlbum">
                    <i class="fa-solid fa-square-plus text-xl"></i>
                  </a>
                  
                  <a href="#" class="nav-link flex items-center justify-center" data-view="albums">
                    <i class="fas fa-images text-xl"></i>
                  </a>
            
                  <a href="#" class="nav-link flex items-center justify-center" data-view="profileUser">
                    <i class="fa-solid fa-user text-xl"></i>
                  </a>
                </div>
              </nav>
            </div>
        `
    }
    addEvents() {
        document.querySelectorAll('.nav-link[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault()
                const view = link.getAttribute('data-view')
                this.navigate(view)
                this.setActiveView(view)
            })
        })
        this.updateActiveLink()
    }

    updateActiveLink() {
        document.querySelectorAll('.nav-link[data-view]').forEach(link => {
            const isActive = link.getAttribute('data-view') === this.currentView
            const activeClasses = ['red-color', 'bg-red-100', 'p-3', 'rounded-full']

            activeClasses.forEach(cls => link.classList.toggle(cls, isActive))
            link.classList.toggle('text-base-content', !isActive)
        });
    }

}