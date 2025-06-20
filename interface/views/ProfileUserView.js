import {AuthModel} from "../models/AuthModel";
import {AlbumListComponent} from "../components/AlbumListComponent";

export class ProfileUserView {
    constructor(root, navigate, user, albums) {
        this.root = root
        this.navigate = navigate
        this.user = user
        this.albums = albums
        this.onSubmit = null;
    }

    render() {
        const albumListComponent = new AlbumListComponent(this.albums, this.handleAlbumClick.bind(this) )

        this.root.innerHTML = `
  <div class="max-w-xl mx-auto bg-base-100 rounded-lg p-6">
    
    <!-- Ligne du haut : avatar + infos -->
    <div class="flex items-start gap-6">
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img src="http://app-loove-interface.local/uploads/profile_pictures/${this.user.user.profile_picture}" alt="Photo de profil" />
        </div>
      </div>

      <div class="flex-1">
        <h2 class="text-2xl font-bold mt-4">${this.user.user.username}</h2>
        
        <div class="flex items-center gap-2">
          <button class="btn btn-outline grey-color btn-sm" id="modification">
            <i class="fa-solid fa-pen mr-1"></i> Modifier le profil
          </button>

          <!-- Roue des paramètres -->
          <div class="drawer-menu drawer-end">
            <input id="drawer-menu" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
              <label for="drawer-menu" class="drawer-button ml-1">
                <i class="fa-solid fa-gear text-sm"></i>
              </label>
            </div>
            <div class="drawer-side">
              <label for="drawer-menu" aria-label="close sidebar" class="drawer-overlay"></label>
              <ul class="menu bg-base-200 text-base-content min-h-full w-60 p-4">
                <li>
                  <button class="ml-auto flex items-center gap-2 text-red-600 hover:text-red-800 transition-all" id="disconnection">
                     Déconnexion <i class="fa-solid fa-arrow-right-from-bracket text-xl"></i>
                    
                  </button>
                </li>
                <li>
                  <button class="ml-auto flex items-center gap-2 hover:text-red-800 transition-all" id="delete">
                    Supprimer mon profil <i class="fa-solid fa-trash text-xl"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bio en dessous -->
    <p class="mt-4 text-sm">${this.user.user.bio}</p>

    <!-- Albums -->
    <div class="px-4 mt-6">
      <h3 class="font-semibold mb-2">Mes albums privés</h3>
      <div id="albumList" class="grid gap-4">
        ${albumListComponent.render()}
      </div>
    </div>
  </div>
`

        this.albumListComponent = albumListComponent

        this.bindEvents()
    }

    bindEvents() {

        this.albumListComponent.bindEvents(document.getElementById('albumList'))

        const btnDisconnection = document.getElementById('disconnection')
        btnDisconnection.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("logout")
        })

        const btnDelete = document.getElementById('delete')
        btnDelete.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("delete")
        })

        const btnModification = document.getElementById('modification')
        btnModification.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("modification")
        })
    }

    handleAlbumClick(albumId) {
        console.log("Album sélectionné :", albumId)
        this.navigate(`photos/${albumId}`)
    }

}