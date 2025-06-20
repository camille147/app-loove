export class UserListComponent {
    constructor(users = [], onToggleDelete = null) {
        this.users = users
        this.onToggleDelete = onToggleDelete
    }

    render() {
        return `
            <ul class="list bg-base-100 rounded-box shadow-md">
                ${this.users.map(user => `
                    <li class="list-row">
                         <div class="flex gap-6 text-lg">
                            <span class="font-bold">${user.username}</span>
                            <span class="text-gray-600">${user.email}</span>
                            <span class="text-gray-600">${user.role ? 'admin' : 'user'}</span>
                        </div>
                        <button class="delete-user-btn ml-auto flex items-center gap-2 text-red-600 hover:text-red-800 transition-all"
                            data-user-id="${user.id}"
                            title="Delete">
                            <i class="fa-solid fa-trash text-xl"></i>
                        </button>
                    </li>
                `).join('')}
            </ul>
        `
    }
    bindEvents(container) {
        container.querySelectorAll('.delete-user-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault()
                const userId = parseInt(btn.dataset.userId, 10)
                if (this.onToggleDelete) {
                    await this.onToggleDelete(userId)
                }
            })
        })
    }
}