import {PhotoListComponent} from "../components/PhotoListComponent";
import {FavoriteCarouselComponent} from "../components/FavoriteCarouselComponent";
import {PublicsAlbumsComponent} from "../components/PublicsAlbumsComponent";
import {AlbumsRecentsListCarouselComponent} from "../components/AlbumsRecentsListCarouselComponent";

export class DashboardUserView {
    constructor(root, navigate, favorites, publicsAlbums, recentsAlbums) {
        this.root = root
        this.navigate = navigate
        this.favorites = favorites || []
        this.publicsAlbums = publicsAlbums || []
        this.recentsAlbums = recentsAlbums || []


    }

    render() {
        const favoriteCarouselComponent = new FavoriteCarouselComponent(this.favorites)
        const publicsAlbumsComponent = new PublicsAlbumsComponent(this.publicsAlbums)
        const recentsAlbumsComponent = new AlbumsRecentsListCarouselComponent(this.recentsAlbums, this.handleAlbumClick.bind(this))



        this.root.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
                <h1 class="text-3xl sm:text-4xl font-bold text-gray-800 text-center" id="titleDashboard"> </h1>

      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Albums récemment créés</h2>
        </div>
        <div id="albums-recents-carousel" class="overflow-x-auto pb-2">
        </div>
      </section>

      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-yellow-500"><i class="fa-solid fa-star"></i> Mes photos favorites</h2>
        </div>
        <div id="favorites-carousel" class="overflow-x-auto pb-2">
        </div>
      </section>

      <!-- Albums publics -->
      <section>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl sm:text-2xl font-bold text-blue-600">Albums publics</h2>
        </div>
        <div id="list-publics-albums" class="space-y-4">
          <!-- Albums publics injectés ici -->
        </div>
      </section>
    </div>
        `
        this.root.querySelector('#favorites-carousel').innerHTML = favoriteCarouselComponent.render()
        favoriteCarouselComponent.bindEvents(this.root.querySelector('#favorites-carousel'))
        this.root.querySelector('#list-publics-albums').innerHTML = publicsAlbumsComponent.render()
        publicsAlbumsComponent.bindEvents(this.root.querySelector('#list-publics-albums'))
        this.root.querySelector('#albums-recents-carousel').innerHTML = recentsAlbumsComponent.render()
        recentsAlbumsComponent.bindEvents(this.root.querySelector('#albums-recents-carousel'))
        this.bindEvents()
    }


    bindEvents() {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            const user = JSON.parse(userStr); // convert string to object
            console.log(user.username); // now you can access the username
            const userEl = document.getElementById("titleDashboard")
            userEl.textContent = `Bienvenue ${user.username}`
        }
    }
    handleAlbumClick(albumId) {
        console.log("Album sélectionné :", albumId)
        this.navigate(`photos/${albumId}`)
    }

}