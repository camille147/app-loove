import {AlbumListComponent} from "../components/AlbumListComponent.js";
import {AlbumModel} from "../models/AlbumModel";

export class AlbumsView {

    constructor(root, navigate, albums) {
        this.root = root
        this.navigate = navigate
        this.albums = albums
    }

    render() {

        const albumListComponent = new AlbumListComponent(this.albums, this.handleAlbumClick.bind(this) )
        this.root.innerHTML = `
            
            <div class="max-w-4xl mx-auto bg-white dark:bg-base-100 shadow-xl rounded-2xl p-6 sm:p-8">
                            <h2 class="text-xl font-bold mb-4">Mes albums</h2>

  <div class="px-2 sm:px-4 mt-4 sm:mt-6">
  
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
      <h3 class="text-xl font-bold text-gray-800 dark:text-white">Mes albums</h3>
      
      <div class="flex items-center gap-2">
        <select id="albumFilter" class="select select-bordered select-sm">
          <option value="all">Tous</option>
          <option value="public">Public</option>
          <option value="shared">Partagé</option>
        </select>
      </div>
    </div>

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

        const filterSelected = document.getElementById('albumFilter')
        const albumListContainer = document.getElementById('albumList')

        filterSelected.addEventListener('change', async () => {
            const filter = filterSelected.value
            const model = new AlbumModel()
            try {
                const filteredAlbums = await model.getAlbumsByFilter(filter)
                const newComponent = new AlbumListComponent(filteredAlbums, this.handleAlbumClick.bind(this))

                albumListContainer.innerHTML = newComponent.render()
                newComponent.bindEvents(albumListContainer)
                this.albumListComponent = newComponent
            } catch (e) {
                alert(("erreur fltrage : " + e.message))
            }
        })
        this.albumListComponent.bindEvents(document.getElementById('albumList'))
    }

    handleAlbumClick(albumId) {
        console.log("Album sélectionné :", albumId)
        this.navigate(`photos/${albumId}`)
    }

}
