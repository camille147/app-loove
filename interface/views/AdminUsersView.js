export class AdminUsersView {
    constructor(root, users) {
        this.root = root
        this.users = users || []
        this.filteredUsers = [...this.users]
    }

    render() {
        this.root.innerHTML = `
      <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-6">Administration des utilisateurs</h1>
        <div class="form-control mb-4">
          <input type="text" placeholder="Rechercher un utilisateur..." class="input input-bordered w-full" id="searchInput" />
        </div>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
              </tr>
            </thead>
            <tbody id="usersTableBody">
            </tbody>
          </table>
        </div>
      </div>
    `
        this.bindEvents()
        this.renderUsersTable()
    }

    bindEvents() {
        const input = this.root.querySelector('#searchInput')
        input.addEventListener('input', (e) => {
            this.filterUsers(e.target.value)
        })
    }

    filterUsers(query) {
        const q = query.trim().toLowerCase()
        if (!q) {
            this.filteredUsers = [...this.users]
        } else {
            this.filteredUsers = this.users.filter(u =>
                u.nom.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.role.toLowerCase().includes(q)
            )
        }
        this.renderUsersTable()
    }

    renderUsersTable() {
        const tbody = this.root.querySelector('#usersTableBody')
        tbody.innerHTML = this.filteredUsers.map(user => `
      <tr>
        <td>${user.id}</td>
        <td>${user.nom}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
      </tr>
    `).join('')
    }
}
