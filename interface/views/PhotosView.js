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
        this.onToggleDelete = null;

        this.model = null;
    }

    async render() {
        const photoListComponent = new PhotoListComponent(this.photos, this.handleToggleFavorite.bind(this), this.handlePhotoClick.bind(this), this.deletePhotoBtn.bind(this))


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
                    ${photoListComponent.render()}
                </div>
            </div>
        `;

        this.photoListComponent = photoListComponent

        await this.loadTags()
        this.bindEvents();
        this.photoListComponent.bindEvents(this.root.querySelector('#photoListContainer'))
    }


    async loadTags() {
        if (!this.model) return;
        try {
            const tags = await this.model.getAllTags()
            console.log(tags)
            const tagSelect = this.root.querySelector('#filterTag')
            tagSelect.innerHTML = `<option value="">Tous tags</option>` + tags.map(tag => `<option value="${tag}">${tag}</option>`).join('');
        } catch {
            console.warn("Erreur chargement des tags :", e.message)
        }
    }

    bindEvents()  {

        const photoListContainer = document.querySelector("#photoListContainer")

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

        try {
            const filteredPhotos = await this.model.getPhotosByAlbum(this.albumId, { order, tag, favorite })
            const newComponent = new PhotoListComponent(filteredPhotos, this.handleToggleFavorite.bind(this), this.handlePhotoClick.bind(this))
            const container = this.root.querySelector('#photoListContainer')
            container.innerHTML = newComponent.render()
            newComponent.bindEvents(container)
            this.photoListComponent = newComponent
        } catch (e) {
            alert("Erreur filtrage photos : " + e.message)
        }

    }

    async handleToggleFavorite(photoId, isFavorite){
        if (this.onToggleFavorite) {
            await this.onToggleFavorite(photoId, isFavorite)
        }
    }

    async deletePhotoBtn(photoId){
        if (this.onToggleDelete) {
            await this.onToggleDelete(photoId)
        }
    }

    handlePhotoClick(photoId) {
        console.log("Album sélectionné :", photoId)
        this.navigate(`modificationPhoto/${photoId}`)
    }


}