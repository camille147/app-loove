export class AddPhotoView {
    constructor(root, navigate, albumId, allTags = []) {
        this.root = root;
        this.navigate = navigate;
        this.albumId = albumId;
        this.allTags = allTags;
        this.onSubmit = null;
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
                    <label for="tagSearch" class="block font-semibold">Rechercher et ajouter des tags love</label>
                    <input type="text" id="tagSearch" placeholder="Rechercher un tag..." class="input input-bordered w-full mb-2" />
                    <div id="tagSuggestions" class="flex flex-wrap gap-2 mb-2"></div>
                    <div id="selectedTagsContainer" class="flex flex-wrap gap-2"></div>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Ajouter</button>
                <button type="button" id="cancelBtn" class="btn btn-secondary mt-4 ml-2">Annuler</button>
            </form>
        `;

        this.bindEvents();
    }




    bindEvents() {
        const form = this.root.querySelector("#addPhotoForm")
        const tagSearch = this.root.querySelector("#tagSearch")
        const tagSuggestions = this.root.querySelector('#tagSuggestions')
        const selectedTagsContainer = this.root.querySelector("#selectedTagsContainer")

       const updateSelectedTags = () => {
            selectedTagsContainer.innerHTML = ""
           this.selectedTags.forEach(tag => {
               const btn = document.createElement("button")
               btn.type = "button"
               btn.className = "btn btn-sm btn-primary"
               btn.innerHTML = `${tag} <span class="ml-1">$times;</span>`
               btn.addEventListener("click", () => {
                   this.selectedTags.delete(tag)
                   updateSelectedTags()
                   renderSuggestions()
               })
               selectedTagsContainer.appendChild(btn)
           })
       }

       const renderSuggestions = () => {
            const search = tagSearch.value.toLowerCase().trim()

           if(!search) {
               tagSuggestions.innerHTML = ""
               return
           }

            const filteredTags = this.allTags.filter(tag =>
                tag.toLowerCase().includes(search) && !this.selectedTags.has(tag)
            )

           if (filteredTags.length === 0) {
               tagSuggestions.innerHTML = `
            <span class="text-gray-500 italic">Aucun tag trouvé</span>
        `;
               return;
           }

           tagSuggestions.innerHTML = filteredTags.map(tag => `
                <button type="button" class="btn btn-sm btn-outline" data-tag="${tag}">${tag}</button>           
            `).join('')
       }


       tagSearch.addEventListener("input", renderSuggestions)

        tagSuggestions.addEventListener("click", (e) => {
            if (e.target.matches("button[data-tag]")) {
                const tag = e.target.getAttribute("data-tag")
                this.selectedTags.add(tag)
                tagSearch.value = ""
                renderSuggestions()
                updateSelectedTags()
            }
        })




        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            //messageDiv.textContent = ''

            const title = document.getElementById('title').value.trim()
            const description = document.getElementById('description').value.trim()
            const takenAt = document.getElementById('takenAt').value
            const file = document.getElementById('img_file')
            const tags = Array.from(this.selectedTags);

            if (file.files.length === 0) {
                console.log("img manquante")
                return
            }

            const coverImageFile = file.files[0]

            if (this.onSubmit) {
                try {
                    const formData = new FormData();
                    formData.append('title', title);
                    formData.append('description', description);
                    formData.append('takenAt', takenAt);
                    formData.append('photo_file', coverImageFile);
                    formData.append('album_id', this.albumId);
                    formData.append('tags', JSON.stringify(tags));

                    await this.onSubmit(formData);
                } catch (error) {
                    console.error(error)
                }
            } else {
                console.warn("Aucune fonction onSubmit définie.")
            }
        })

        this.root.querySelector("#cancelBtn").addEventListener("click", () => {
            this.navigate(`photos/${this.albumId}`);
        });

        updateSelectedTags()

    }
}
