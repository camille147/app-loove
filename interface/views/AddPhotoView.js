export class AddPhotoView {
    constructor(root, navigate, albumId) {
        this.root = root;
        this.navigate = navigate;
        this.albumId = albumId;
        this.onSubmit = null;
        this.allTags = [];
        this.selectedTags = new Set();
    }

    async render() {
        this.root.innerHTML = `
            <form id="addPhotoForm" class="max-w-xl mx-auto p-4 border rounded shadow">
                <h2 class="text-xl font-bold mb-4">Ajouter une photo</h2>
                <div class="mb-3">
                    <label for="title" class="block font-semibold">Titre</label>
                    <input type="text" id="title" name="title" class="input input-bordered w-full" required />
                </div>
                <div class="mb-3">
                    <label for="description" class="block font-semibold">Description</label>
                    <textarea id="description" name="description" class="textarea textarea-bordered w-full"></textarea>
                </div>
                <div class="mb-3">
                    <label for="takenAt" class="block font-semibold">Date de prise</label>
                    <input type="date" id="takenAt" name="takenAt" class="input input-bordered" />
                </div>
                <div class="mb-3">
                    <label for="img_file" class="block font-semibold">Fichier image</label>
                    <input type="file" id="img_file" name="img_file" accept="image/*" required />
                </div>
                <div class="mb-3">
                    <label for="tagSearch" class="block font-semibold">Rechercher et sélectionner tags</label>
                    <input type="text" id="tagSearch" placeholder="Rechercher un tag..." class="input input-bordered w-full mb-2" />
                    <div id="tagsContainer" class="flex flex-wrap gap-2"></div>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Ajouter</button>
                <button type="button" id="cancelBtn" class="btn btn-secondary mt-4 ml-2">Annuler</button>
            </form>
        `;

        await this.loadTags();
        this.renderTags(this.allTags);
        this.bindEvents();
    }

    async loadTags() {
        try {
            const res = await fetch("http://app-loove-api.local/tags", { credentials: "include" });
            const data = await res.json();
            this.allTags = data.tags || [];
        } catch (e) {
            console.error("Erreur chargement tags", e);
            this.allTags = [];
        }
    }

    renderTags(tags) {
        const container = this.root.querySelector("#tagsContainer");
        container.innerHTML = tags.map(tag => `
            <button type="button" class="tag-btn btn btn-sm btn-outline" data-tag="${tag.name}">${tag.name}</button>
        `).join('');
    }

    bindEvents() {
        const form = this.root.querySelector("#addPhotoForm");
        const tagSearch = this.root.querySelector("#tagSearch");
        const tagsContainer = this.root.querySelector("#tagsContainer");

        tagSearch.addEventListener("input", (e) => {
            const search = e.target.value.toLowerCase();
            const filteredTags = this.allTags.filter(tag => tag.name.toLowerCase().includes(search));
            this.renderTags(filteredTags);
        });

        tagsContainer.addEventListener("click", (e) => {
            if (e.target.matches(".tag-btn")) {
                const tag = e.target.getAttribute("data-tag");
                if (this.selectedTags.has(tag)) {
                    this.selectedTags.delete(tag);
                    e.target.classList.remove("btn-primary");
                    e.target.classList.add("btn-outline");
                } else {
                    this.selectedTags.add(tag);
                    e.target.classList.add("btn-primary");
                    e.target.classList.remove("btn-outline");
                }
            }
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = form.title.value.trim();
            const description = form.description.value.trim();
            const takenAt = form.takenAt.value;
            const file = form.img_file.files[0];
            const tags = Array.from(this.selectedTags);

            if (!file) {
                alert("Veuillez sélectionner un fichier image");
                return;
            }

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("takenAt", takenAt);
            formData.append("img_file", file);
            formData.append("album_id", this.albumId);
            formData.append("tags", JSON.stringify(tags));

            if (this.onSubmit) this.onSubmit(formData);
        });

        this.root.querySelector("#cancelBtn").addEventListener("click", () => {
            this.navigate(`photos/${this.albumId}`);
        });
    }
}
