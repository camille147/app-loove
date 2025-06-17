
export class PhotoListComponent {
    constructor(photos =[], onToggleFavorite = null, onPhotoClick = null, onToggleDelete = null) {
        this.photos = photos
        this.onToggleFavorite = onToggleFavorite
        this.onPhotoClick = onPhotoClick
        this.onToggleDelete = onToggleDelete

    }

    render() {
        if (!this.photos.length) {
        return `<p>Aucune photo trouvé</p>`}

        return `
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                ${this.photos.map(photo => `
                        <div class="bg-white rounded-2xl shadow-lg overflow-hidden relative transition transform hover:scale-105 duration-300">
                            <img src="http://app-loove-interface.local/uploads/photos/${photo.filename}" 
                                 alt="${photo.alt || ''}" 
                                 class="w-full h-64 object-cover">
                            
                            <button 
                                class="favorite-btn absolute top-3 right-3 text-2xl text-yellow-500 cursor-pointer"
                                data-photo-id="${photo.id}" 
                                title="Favori">
                                ${photo.isFavorite ? '★' : '☆'}
                            </button>
                            <div class="p-4">
                <button class="delete-photo-btn ml-auto flex items-center gap-2 text-red-600 hover:text-red-800 transition-all"
                 data-photo-id="${photo.id}"
                 title="Delete">
                  <i class="fa-solid fa-trash text-xl"></i>
                </button>
                <button class="btn-photo  "
data-photo-id="${photo.id}  "               title="modif">
                 modif
                </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `
    }

    bindEvents(container) {
        container.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const photoId = btn.getAttribute('data-photo-id')
                const photo = this.photos.find(p => p.id == photoId)

                if (!photo) return

                const newFavoriteState = !photo.isFavorite

                if (this.onToggleFavorite) {
                    await this.onToggleFavorite(photoId, newFavoriteState)
                    photo.isFavorite = newFavoriteState
                    btn.innerHTML = newFavoriteState ? '★' : '☆'
                }


            })
        })
        container.querySelectorAll('.delete-photo-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                console.log("delte")
                const photoId = btn.getAttribute('data-photo-id')
                const photo = this.photos.find(p => p.id == photoId)

                if (!photo) return

                if(this.onToggleDelete) {
                    //console.log('deletephoto')
                    await this.onToggleDelete(photoId)
                }

            })
        })

        container.querySelectorAll('.btn-photo').forEach(card => {
            card.addEventListener('click', () => {
                const photoId = card.getAttribute('data-photo-id');
                if (this.onPhotoClick) {
                    this.onPhotoClick(photoId)
                    console.log(photoId)
                }
            })
        })

    }
}