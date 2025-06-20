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
            
      <div class="max-w-xl mx-auto bg-base-100 shadow-xl rounded-lg p-6">
        <div class="flex items-center gap-6">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="http://app-loove-interface.local/uploads/profile_pictures/${this.user.user.profile_picture}" alt="Photo de profil" />
            </div>
          </div>
          <div>
            <h2 class="text-2xl font-bold">${this.user.user.username}</h2>
            <!--<div class="flex gap-6 mt-2 text-sm text-gray-500">
              <span><strong>152</strong> publications</span>
              <span><strong>2 340</strong> abonnés</span>
            </div>-->
            
            <div class="flex items-center justify-between mt-2">
    <button class="btn btn-outline btn-primary btn-sm" id="modification">
      <i class="fa-solid fa-pen mr-2"></i> Modifier le profil
    </button>
    
    <button class=" px-2" id="menu">
    <i class="fa-solid fa-gear text-sm"></i>
  </button>
  </div>
          </div>
        </div>
<p class="mt-2 text-sm">
              ${this.user.user.bio}
            </p>


        <div class="px-4 mt-6">
          <h3 class="font-semibold mb-2">Mes albums</h3>
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


        const btnMenu = document.getElementById('menu')
        btnMenu.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("menu")
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