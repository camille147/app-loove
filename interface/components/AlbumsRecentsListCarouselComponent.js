export class AlbumsRecentsListCarouselComponent{
    constructor(albumsRecents = [], onAlbumClick = null) {
        this.albumsRecents = albumsRecents
        this.onAlbumClick = onAlbumClick

    }

    render() {

        if (!this.albumsRecents.length) {
            return `<p class="p-4 text-gray-600">Aucune photo favorite trouvée.</p>`
        }
        return `
        <div class="flex gap-4 overflow-x-auto">
            ${this.albumsRecents.map(album => `
                <div class="min-w-[200px] flex-shrink-0 carousel-item " data-album-id="${album.id}">
                    <div class="rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
                        <img 
                            src="http://app-loove-interface.local/uploads/${album.imgProfileAlbum}" 
                            alt="${album.description || 'Photo album'}"
                            class="w-full h-40 object-cover"
                        />          
                        <div class="text-center">                         
                            <p class="mt-2 text-center text-sm text-gray-700 font-medium truncate w-full">${album.title}</p>
                        </div>      
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    }

    bindEvents(container) {
        container.querySelectorAll('.carousel-item').forEach(item => {
            item.addEventListener('click', () => {
                const albumId = item.getAttribute('data-album-id')
                if (this.onAlbumClick) {
                    this.onAlbumClick(albumId)
                }
            })
        })
    }
}
