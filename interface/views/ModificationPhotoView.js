import {UserModel} from "../models/UserModel";

export class ModificationPhotoView {
    constructor(root, navigate, photo, allTags = []) {
        this.root = root
        this.navigate = navigate
        this.photo = photo
        this.allTags = allTags
        this.onSubmit = null;
        const tagsRaw = photo.photo.tags || []
        let tagsArray = []

        if (typeof tagsRaw === "string") {
            try {
                tagsArray = JSON.parse(tagsRaw)
            } catch (e) {
                console.warn("Erreur parsing tags JSON", tagsRaw)
                tagsArray = []
            }
        } else {
            tagsArray = tagsRaw
        }

        this.selectedTags = new Set(tagsArray)
    }

    render() {
        this.root.innerHTML = `
        <div class="max-w-xl mx-auto p-6 bg-white rounded shadow">
            <h2 class="text-2xl font-bold mb-4">Modifier la photo</h2>
            <form id="editPhotoForm" enctype="multipart/form-data">
               <div class="mb-4">
        <label class="block text-sm font-medium">Titre</label>
        <input type="text" name="title" value="${this.photo.photo.title || ''}" class="input input-bordered w-full" required>
    </div>

    <div class="mb-4">
        <label class="block text-sm font-medium">Description</label>
        <textarea name="description" class="textarea textarea-bordered w-full">${this.photo.photo.description || ''}</textarea>
    </div>

    <div class="mb-4">
        <label class="block text-sm font-medium">Date de prise</label>
        <input type="date" name="taken_at" class="input input-bordered w-full" value="${this.photo.photo.taken_at || ''}">
    </div>

    <div class="mb-3">
                    <label for="tagSearch" class="block font-semibold">Rechercher et ajouter des tags love</label>
                    <input type="text" id="tagSearch" placeholder="Rechercher un tag..." class="input input-bordered w-full mb-2" />
                    <div id="tagSuggestions" class="flex flex-wrap gap-2 mb-2"></div>
                    <div id="selectedTagsContainer" class="flex flex-wrap gap-2"></div>
                </div>


               


                <div class="flex justify-between">
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                    <button id="cancelBtn" class="btn btn-secondary">Annuler</button>
                </div>
            </form>
        </div>
    `;
        console.log(this.photo.photo)
        console.log(this.allTags)
        console.log("Selected tags:", [...this.selectedTags])

        this.bindEvents()
        this.updateSelectedTags()

    }


    bindEvents() {
        const form = this.root.querySelector('#editPhotoForm');
        const tagSearch = this.root.querySelector("#tagSearch")
        const tagSuggestions = this.root.querySelector('#tagSuggestions')
        const selectedTagsContainer = this.root.querySelector("#selectedTagsContainer")
        const retourBtn = this.root.querySelector('#cancelBtn');

        retourBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(`photos/${this.photo.photo.album_id}`); // ou autre route retour
        });







        tagSearch.addEventListener("input", ()=> this.renderSuggestions())

        tagSuggestions.addEventListener("click", (e) => {
            if (e.target.matches("button[data-tag]")) {
                const tag = e.target.getAttribute("data-tag")
                this.selectedTags.add(tag)
                tagSearch.value = ""
                this.renderSuggestions()
                this.updateSelectedTags()
            }
        })

        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const title= form.querySelector('input[name="title"]').value.trim()
            const description = form.querySelector('textarea[name="description"]').value.trim()
            const taken_at= form.querySelector('input[name="taken_at"]').value
            const tags = Array.from(this.selectedTags);

            const jsonTags = JSON.stringify(tags)


            const photoDataForm = {
                photo_id: this.photo.photo.id,
                title,
                description,
                taken_at,
                tags: tags,
                alt: title
            }

            console.log(photoDataForm)
            console.log(JSON.stringify(photoDataForm))
            if (this.onSubmit) {
                try {
                    await this.onSubmit(photoDataForm);
                } catch (error) {
                    alert(error.message || "Erreur lors de la mise à jour de la photo.");
                }
            }
        });
    }

     updateSelectedTags = () => {
        const selectedTagsContainer = this.root.querySelector("#selectedTagsContainer");
        selectedTagsContainer.innerHTML = ""
        this.selectedTags.forEach(tag => {
            const btn = document.createElement("button")
            btn.type = "button"
            btn.className = "btn btn-sm btn-primary"
            btn.innerHTML = `${tag} <span class="ml-1">&times;</span>`
            btn.addEventListener("click", () => {
                this.selectedTags.delete(tag)
                this.updateSelectedTags()
                this.renderSuggestions()
            })
            selectedTagsContainer.appendChild(btn)
        })
    }

    renderSuggestions = () => {
        const tagSearch = this.root.querySelector("#tagSearch")
        const tagSuggestions = this.root.querySelector('#tagSuggestions')
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

}