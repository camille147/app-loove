import {AlbumListComponent} from "../components/AlbumListComponent.js";
import {PhotoModel} from "../models/PhotoModel";
import {PhotoListComponent} from "../components/PhotoListComponent";

export class AdminTagsCreateView {

    constructor(root, navigate, tags) {
        this.root = root
        this.navigate = navigate
        this.tags = tags
        this.onSubmit = null
    }

    async render() {


        this.root.innerHTML = `
            <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow">
                <h2 class="text-2xl font-bold mb-4">Gestion des tags</h2>
                
                <div class="mb-4">
                    <h3 class="text-lg font-semibold mb-2">Tags existants</h3>
                    <div class="flex flex-wrap gap-2" id="tagsList">
                        ${this.tags.map(tag => `
                            <span class="badge badge-outline">${tag}</span>
                        `).join('')}
                    </div>
                </div>

                <!-- Bouton pour ouvrir la modale -->
                <div class="mt-6">
                    <button class="btn btn-primary" onclick="document.getElementById('tag_modal').showModal()">Créer un tag</button>
                </div>
            </div>

            <!-- Modale -->
            <dialog id="tag_modal" class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Créer un nouveau tag</h3>
                    <form id="createTagForm" class="mt-4">
                        <label class="block mb-2 font-medium">Nom du tag</label>
                        <input type="text" name="name" placeholder="Nom du tag" class="input input-bordered w-full" required />
                        
                        <div class="modal-action mt-6">
                            <form method="dialog">
                                <button type="button" class="btn" id="closeModalBtn">Annuler</button>
                            </form>
                            <button type="submit" class="btn btn-primary">Créer</button>
                        </div>
                    </form>
                </div>
            </dialog>
        `;


        this.bindEvents();
    }




    bindEvents() {
        const form = document.getElementById('createTagForm');
        const closeBtn = document.getElementById('closeModalBtn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.name.value.trim();

            if (!name) return;

            if (this.onSubmit) {
                try {
                    await this.onSubmit({name});
                    document.getElementById('tag_modal').close();

                    // Ajouter visuellement le tag à la liste
                    const tagsList = this.root.querySelector('#tagsList');
                    const span = document.createElement('span');
                    span.className = "badge badge-outline";
                    span.textContent = name;
                    tagsList.appendChild(span);

                    form.reset();
                } catch (err) {
                    alert("Erreur lors de la création du tag.");
                    console.error(err);
                }
            }

        });

        closeBtn.addEventListener('click', () => {
            document.getElementById('tag_modal').close();
        });

    }

}