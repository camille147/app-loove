import {AlbumListComponent} from "../components/AlbumListComponent.js";
import {PhotoModel} from "../models/PhotoModel";
import {PhotoListComponent} from "../components/PhotoListComponent";

export class PhotosView {

    constructor(root, navigate, albumId, photos = []) {
        this.root = root
        this.navigate = navigate
        this.photos = photos
        this.albumId = albumId
        this.onToggleFavorite = null;
        this.model = null;    }

    async render() {
        this.root.innerHTML = `
        <div class="max-w-4xl mx-auto bg-white shadow rounded p-6">
                <div class="mb-4 flex flex-wrap justify-between items-center gap-4">
                    <h3 class="text-xl font-bold">Photos de l’album</h3>
                    <div class="flex gap-2">
                        <select id="filterOrder" class="select select-bordered select-sm">
                            <option value="all">Tous</option>
                            <option value="recent">Récentes</option>
                            <option value="old">Anciennes</option>
                        </select>
                        <select id="filterTag" class="select select-bordered select-sm">
                            <option value="">Tous tags</option>
                        </select>
                        <label class="label cursor-pointer flex items-center">
                            <input type="checkbox" id="favoriteCheckbox" class="checkbox checkbox-sm" />
                            <span class="label-text ml-2">Favoris</span>
                        </label>
                    </div>
                    <button id="addPhotoBtn" class="btn btn-primary btn-sm">Ajouter une photo</button>
                </div>
                <div id="photoListContainer">
                
                </div>
            </div>
        `;

        await this.loadTags()

        this.photoListComponent = new PhotoListComponent(this.photos, async (photoId) => {
            if (this.onToggleFavorite) {
                await this.onToggleFavorite(photoId);
                //await this.applyFilters();
            }
        });

        this.renderPhotos(this.photos);

        this.bindEvents();
    }


    async loadTags() {
        if (!this.model) return;
        try {
            const tags = await this.model.getAllTags();
            const tagSelect = this.root.querySelector('#filterTag');
            tagSelect.innerHTML = `<option value="">Tous tags</option>` + tags.map(tag => `<option value="${tag.name}">${tag.name}</option>`).join('');
        } catch {
            // erreur silencieuse
        }
    }

    renderPhotos(photos) {
        const container = this.root.querySelector('#photoListContainer');
        container.innerHTML = this.photoListComponent.render();
        this.photoListComponent.bindEvents(container);
    }

    bindEvents()  {
        this.root.querySelector('#filterOrder').addEventListener('change', () => this.applyFilters())
        this.root.querySelector('#filterTag').addEventListener('change', () => this.applyFilters())
        this.root.querySelector('#favoriteCheckbox').addEventListener('change', () => this.applyFilters())

        this.root.querySelector('#addPhotoBtn').addEventListener('click', () => {
            this.navigate(`addPhoto/${this.albumId}`)
        });

    }


    async applyFilters() {
        const order = this.root.querySelector('#filterOrder').value
        const tag = this.root.querySelector('#filterTag').value || null
        const favorite = this.root.querySelector('#favoriteCheckbox').checked

        if (!this.model) return

        this.photos = await this.model.getPhotosByAlbum(this.albumId, {order, tag, favorite})
        this.renderPhotos(this.photos)

    }


}