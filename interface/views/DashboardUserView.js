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
            <div class="max-w-md mx-auto space-y-4">
<h1></h1>
      <!-- Albums récents -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body flex-row items-center gap-4">
            
            <h2 class="card-title">Albums récents</h2>
            <div id="albums-recents-carousel" class="w-full overflow-x-auto"></div>

          <!--<button class="btn btn-sm btn-circle btn-primary text-lg">+</button>-->
        </div>
      </div>

      <!-- Photos favorites -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body flex-row items-center gap-4">
          <span class="text-yellow-500 text-2xl">⭐</span>
          <h2 class="card-title">Photos favorites</h2>
        </div>
           <div id="favorites-carousel" class="w-full overflow-x-auto"></div>
      </div>
      
      <div id="list-publics-albums">
      
      </div>

      

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
        }
    }
    handleAlbumClick(albumId) {
        console.log("Album sélectionné :", albumId)
        this.navigate(`photos/${albumId}`)
    }

}