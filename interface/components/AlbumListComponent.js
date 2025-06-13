export class AlbumListComponent {
    constructor(albums, onAlbumClick = null) {
        this.albums = albums
        this.onAlbumClick = onAlbumClick
    }

    render() {
        return `
            <div class="grid grid-cols-2 gap-4">
                ${this.albums.map(album => `
                    <button class="btn-album" data-album-id="${album.id}">
                        <div>
                            <img src="http://app-loove-interface.local/uploads/${album.imgProfileAlbum}" class="rounded-lg" />
                            <p class="font-semibold mt-1">${album.title}</p>
                            <p class="text-sm text-gray-500">${album.visibility}</p>
                        </div>
                    </button>
                `).join('')}
            </div>
        `;
    }

    bindEvents(container) {
        container.querySelectorAll('.btn-album').forEach(btn => {
            btn.addEventListener('click', () => {
                const albumId = btn.getAttribute('data-album-id')
                if (this.onAlbumClick) {
                    this.onAlbumClick(albumId)
                }
            })
        })
    }
}

