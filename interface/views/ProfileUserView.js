import {UserModel} from "../models/UserModel";

export class ProfileUserView {
    constructor(root, navigate, user, albums= []) {
        this.root = root
        this.navigate = navigate
        this.user = user
        this.albums = albums
        this.onSubmit = null;
    }

    render() {
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
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            ${this.albums.map(album => `
              <button class="btn-album relative group overflow-hidden rounded-lg shadow hover:shadow-lg transition-all" data-album-id="${album.id}">
                <img src="http://app-loove-interface.local/uploads/${album.imgProfileAlbum}" class="w-full h-auto object-cover transition-transform group-hover:scale-105" />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3 text-white">
                  <h4 class="text-sm font-semibold">${album.title}</h4>
                  <p class="text-xs">${album.visibility}</p>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

        `
        this.bindEvents()
    }

    bindEvents() {

        //console.log(this.albums)
        document.querySelectorAll('.btn-album').forEach(btn => {
            btn.addEventListener('click', () => {
                const albumId = btn.getAttribute('data-album-id')
                console.log(albumId)
            })
        })

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

}