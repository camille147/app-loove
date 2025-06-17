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
                    <input type="text" name="title" value="${this.photo.title || ''}" class="input input-bordered w-full" required>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium">Description</label>
                    <textarea name="description" class="textarea textarea-bordered w-full">${this.photo.description || ''}</textarea>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium">Nouvelle image (facultatif)</label>
                    <input type="file" name="image" accept="image/*" class="file-input file-input-bordered w-full">
                </div>

                <input type="hidden" name="photo_id" value="${this.photo.photoId}" />

                <div class="flex justify-between">
                    <button type="submit" class="btn btn-primary">Enregistrer</button>
                    <button id="cancelBtn" class="btn btn-secondary">Annuler</button>
                </div>
            </form>
        </div>
    `;

        this.bindEvents();
    }


    bindEvents() {
        const form = this.root.querySelector('#editPhotoForm');
        const cancelBtn = this.root.querySelector('#cancelBtn');

        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(`photos/${this.photo.albumId}`); // ou autre route retour
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            if (this.onSubmit) {
                try {
                    await this.onSubmit(formData);
                } catch (error) {
                    alert(error.message || "Erreur lors de la mise à jour de la photo.");
                }
            }
        });
    }

}