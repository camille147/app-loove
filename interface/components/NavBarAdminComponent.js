export class NavBarAdminComponent {
    constructor(navigate) {
        this.navigate = navigate
        this.root = null
    }

    mount(root) {
        this.root = root
        this.root.innerHTML = `
        <div class="drawer drawer-end">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="drawer-button absolute top-4 right-4"><i class="fa-solid fa-bars text-xl"></i></label>
          </div>
          <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              <!-- Sidebar content here -->
              <li><a href="#" data-view="adminDashboard">Dashboard</a></li>
              <li><a href="#" data-view="adminTags">Etiquettes</a></li>
              <li><a href="#" data-view="adminCreateAdmin">Créer Admin</a></li>
              <li><a href="#" data-view="adminProfile">Profil</a></li>
              <li><a href="#" class="red-color" data-view="logout">Déconnexion</a></li>
            </ul>
          </div>
        </div>
        `
        this.root.querySelectorAll('.drawer-side a[data-view]').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault()
                const view = link.getAttribute('data-view')
                this.navigate(view)
            })
        })
    }

    unmount() {
        if (this.root) {
            this.root.innerHTML =""
            this.root = null
        }
    }

}
