export class PhotoListComponent {
    constructor(photos =[], onToggleFavorite = null) {
        this.photos = photos
        this.onToggleFavorite = onToggleFavorite
    }

    render() {
        if (!this.photos.length) {
        return `<p>Aucune photo trouvé</p>`}

        return `
        <div class="grid grid-cols-3 gap-4">
                ${this.photos.map(photo => `
                    <div class="border rounded shadow p-2 relative">
                        <img src="http://app-loove-interface.local/uploads/photos/${photo.filename}" alt="${photo.alt || ''}" class="w-full h-48 object-cover rounded" />
                        <h4 class="font-semibold mt-2">${photo.title}</h4>
                        <p class="text-sm text-gray-600">${photo.description || ''}</p>
                        <button class="favorite-btn absolute top-2 right-2 text-xl cursor-pointer" data-photo-id="${photo.id}" title="Favori">
                            ${photo.isFavorite ? '★' : '☆'}
                        </button>
                    </div>
                `).join('')}
            </div>`;
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
    })}
}