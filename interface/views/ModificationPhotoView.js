import {UserModel} from "../models/UserModel";

export class ModificationPhotoView {
    constructor(root, navigate, photo) {
        this.root = root
        this.navigate = navigate
        this.photo = photo
        this.onSubmit = null;
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

    <div class="mb-4">
        <label class="block text-sm font-medium">Tags (séparés par des virgules)</label>
        <input type="text" name="tags" class="input input-bordered w-full" value="${(this.photo.photo.tags || []).join(', ')}">
    </div>


               


                <div class="flex justify-between">
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                    <button id="cancelBtn" class="btn btn-secondary">Annuler</button>
                </div>
            </form>
        </div>
    `;
        console.log(this.photo.photo)

        this.bindEvents();
    }


    bindEvents() {
        const form = this.root.querySelector('#editPhotoForm');
        const retourBtn = this.root.querySelector('#cancelBtn');
        retourBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(`photos/${this.photo.photo.album_id}`); // ou autre route retour
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const title= form.querySelector('input[name="title"]').value.trim()
            const description = form.querySelector('textarea[name="description"]').value.trim()
            const taken_at= form.querySelector('input[name="taken_at"]').value
            const tagsTab= form.querySelector('input[name="tags"]').value

const tags = tagsTab.split(',').map(tag => tag.trim()).filter(Boolean)

            const photoDataForm = {
                photo_id: this.photo.photo.id,
                title,
                description,
                taken_at,
                tags,
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

}