export class SearchBar {
    constructor(root, onSearch) {
        this.root = root;
        this.onSearch = onSearch;
    }

    render() {
        this.root.innerHTML = `
            <div class="form-control mb-4">
                <div class="input-group">
                    <input type="text" placeholder="Rechercher un utilisateur" class="input input-bordered w-full" id="searchInput" />
                    <button class="btn btn-square" id="btnSearch">
                        <i class="bi bi-search"></i>
                    </button>
                </div>
            </div>
        `;
        this.bindEvents();
    }

    bindEvents() {
        const input = this.root.querySelector('#searchInput');
        input.addEventListener('input', (e) => {
            if (this.onSearch) this.onSearch(e.target.value);
        });
        this.root.querySelector('#btnSearch').addEventListener('click', () => {
            if (this.onSearch) this.onSearch(input.value);
        })
    }
}
