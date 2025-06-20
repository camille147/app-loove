export class AlbumsRecentsListCarouselComponent{
    constructor(albumsRecents = [], onAlbumClick = null) {
        this.albumsRecents = albumsRecents
        this.onAlbumClick = onAlbumClick

    }

    render() {
        console.log(this.albumsRecents)

        if (!this.albumsRecents.length) {
            return `<p class="p-4 text-gray-600">Aucune photo favorite trouvée.</p>`
        }

        return `
            <div class="carousel rounded-box">
                ${this.albumsRecents.map(album => `
                    <div class="carousel-item" data-album-id="${album.id}">
                        <img 
                            src="http://app-loove-interface.local/uploads/${album.imgProfileAlbum}" 
                            alt="${album.description || 'Photo favorite'}" 
                            class="w-64 h-64 object-cover rounded-xl border border-gray-200 shadow cursor-pointer" 
                            data-album-id="${album.id}/>
                           <h2>${album.title}</h2> 
                    </div>
                `).join('')}
            </div>

        
        `
    }

    bindEvents(container) {
        container.querySelectorAll('.carousel-item img').forEach(btn => {
            btn.addEventListener('click', () => {
                const albumId = btn.getAttribute('data-album-id')
                if (this.onAlbumClick) {
                    this.onAlbumClick(albumId)
                }
            })
        })
    }
}
