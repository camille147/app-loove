import {PhotoListComponent} from "../components/PhotoListComponent";
import {FavoriteCarouselComponent} from "../components/FavoriteCarouselComponent";

export class DashboardUserView {
    constructor(root, navigate, favorites) {
        this.root = root
        this.navigate = navigate
        this.favorites = favorites || []
    }

    render() {
        const favoriteCarouselComponent = new FavoriteCarouselComponent(this.favorites)

        this.root.innerHTML = `
            <div class="max-w-md mx-auto space-y-4">

      <!-- Albums récents -->
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body flex-row items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-neutral rounded-box flex items-center justify-center text-xs text-neutral-content">
              Miniature
            </div>
            <h2 class="card-title">Albums récents</h2>
          </div>
          <button class="btn btn-sm btn-circle btn-primary text-lg">+</button>
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

      <!-- Invitations reçues -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body flex-row items-center gap-4">
          <span class="text-blue-500 text-2xl">📥</span>
          <h2 class="card-title">Invitations reçues</h2>
        </div>
      </div>

      <!-- Activité récente -->
      <div class="card bg-base-200 shadow-md">
        <div class="card-body flex-row items-center gap-4">
          <span class="text-red-500 text-2xl">🔔</span>
          <h2 class="card-title">Activité récente</h2>
        </div>
      </div>

    </div>
        `
        this.root.querySelector('#favorites-carousel').innerHTML = favoriteCarouselComponent.render()
        favoriteCarouselComponent.bindEvents(this.root.querySelector('#favorites-carousel'))
        this.bindEvents()
    }


    bindEvents() {

    }

}