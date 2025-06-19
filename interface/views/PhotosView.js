import {AlbumListComponent} from "../components/AlbumListComponent.js";
import {PhotoModel} from "../models/PhotoModel";
import {PhotoListComponent} from "../components/PhotoListComponent";

export class PhotosView {

    constructor(root, navigate, albumId, photos = [], albumInfo) {
        this.root = root
        this.navigate = navigate
        this.photos = photos
        this.albumId = albumId
        this.onToggleFavorite = null;
        this.onToggleDelete = null;
        this.albumInfo = albumInfo

        this.model = null;
    }

    async render() {
        const photoListComponent = new PhotoListComponent(this.photos, this.handleToggleFavorite.bind(this), this.handlePhotoClick.bind(this), this.deletePhotoBtn.bind(this))


        this.root.innerHTML = `

        <div class="relative ">
              <img src="http://app-loove-interface.local/uploads/${this.albumInfo.album.img_profile_album}" alt="Photo de profil" />

              <h1 class="absolute bottom-4 left-4 text-white font-bold text-xl drop-shadow">
                ${this.albumInfo.album.title}
              </h1>
              <div class="drawer drawer-end absolute top-4 left-4 z-10">
                  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                  <div class="drawer-content">
                    <!-- Page content here -->
                    <label for="my-drawer" class="drawer-button"><i class="fa-solid fa-ellipsis-vertical"></i></label>
                  </div>
                  <div class="drawer-side">
                    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                    <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4">
                      <!-- Sidebar content here -->
                      <li>
                        <button class="btn btn-outline btn-primary btn-sm" id="modification">
                          <i class="fa-solid fa-pen mr-2"></i> Modifier le profil
                        </button>
                      </li>
                      <li>
                        <button class="btn btn-outline btn-primary btn-sm" id="delete" data-album-id="${this.albumId}" >
                            <i class="fa-solid fa-trash"></i> Supprimer l'album
                        </button>
                      </li>
                      
                    </ul>
                  </div>
              </div>
        
        </div>

        <div class="flex ml-2 gap-6 mt-2  text-sm text-gray-500">
            <span>${this.albumInfo.album.visibility}</span>
        </div>
        <p class="mt-4 ml-2">${this.albumInfo.album.description}</p>

        <div class="max-w-4xl mx-auto bg-white shadow rounded p-6">
                <div class="mb-4 flex flex-wrap justify-between items-center gap-4">
                
                
                
                <div class="drawer drawer-end">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <label for="my-drawer" class="drawer-button"><i class="fa-solid fa-sliders"></i></label>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4">
      <!-- Sidebar content here -->
      <li><select id="filterOrder" class="select select-bordered select-sm">
                            <option value="all">Tous</option>
                            <option value="recent">Récentes</option>
                            <option value="old">Anciennes</option>
                        </select></li>
      <li><select id="filterTag" class="select select-bordered select-sm">
                            <option value="">Tous tags</option>
                        </select></li>
                        
                        <li><label class="label cursor-pointer flex items-center">
                            <input type="checkbox" id="favoriteCheckbox" class="checkbox checkbox-sm" />
                            <span class="label-text ml-2">Favoris</span>
                        </label></li>
    </ul>
  </div>
</div>
        
                    <button id="addPhotoBtn" class="w-24 rounded-full red-color-background"><i class="fa-solid fa-plus"></i></button>
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
        })

        const deleteAlbumBtn = document.getElementById("delete")
        const modificationAlbumBtn = document.getElementById("modification")

        deleteAlbumBtn.addEventListener('click', async (e) => {
            console.log('delete')
            e.preventDefault()

            const albumId =  e.currentTarget.getAttribute('data-album-id');
            console.log(albumId)
            this.navigate(`deleteAlbum/${albumId}`)
        })

        modificationAlbumBtn.addEventListener('click', async(e) => {
            console.log('modif')
            e.preventDefault()

            this.navigate(`updateAlbum/${this.albumId}`)
        })


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