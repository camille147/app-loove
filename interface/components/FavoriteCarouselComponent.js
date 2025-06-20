export class FavoriteCarouselComponent {
    constructor(favorites = []) {
        this.favorites = favorites
    }

    render() {
        if (!this.favorites.length) {
            return `<p class="p-4 text-gray-600">Aucune photo favorite trouvée.</p>`
        }

        return `
            <div class="carousel rounded-box">
                ${this.favorites.map(photo => `
                    <div class="carousel-item" data-photo-id="${photo.id}">
                        <img 
                            src="http://app-loove-interface.local/uploads/photos/${photo.filename}" 
                            alt="${photo.alt || 'Photo favorite'}" 
                            class="w-64 h-64 object-cover rounded-xl border border-gray-200 shadow cursor-pointer" />
                    </div>
                `).join('')}
            </div>

            <!-- Modale photo zoomée -->
            <dialog id="photo_modal" class="modal">
              <div class="modal-box max-w-3xl p-4 space-y-2">
                <img id="modal-photo-img" src="" alt="Photo zoomée" class="w-full h-auto rounded-lg shadow" />
                <h3 id="modal-photo-title" class="text-lg font-bold"></h3>
                <p id="modal-photo-desc" class="text-sm text-gray-600"></p>
                <div class="flex ml-2 gap-6 mt-2  text-sm text-gray-500">
                    <span id="modal-photo-date"></span>
                </div>
              </div>
              <form method="dialog" class="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
        `
    }

    bindEvents(container) {
        // Placeholder si tu veux plus tard ajouter un clic, popup, etc.
        container.querySelectorAll('.carousel-item img').forEach(img => {
            img.addEventListener('click', () => {
                const modal = document.getElementById('photo_modal')
                const modalImg = document.getElementById('modal-photo-img')
                const title = document.getElementById('modal-photo-title')
                const desc = document.getElementById('modal-photo-desc')
                const date = document.getElementById('modal-photo-date')


                const carouselItem = img.closest('.carousel-item')
                const photoId = carouselItem.getAttribute('data-photo-id')
                const photo = this.favorites.find(p => p.id == photoId)

                modalImg.src = img.src
                title.textContent = photo?.title || ''
                desc.textContent = photo?.description || ''
                date.textContent = photo?.takenDate || ''
                modal.showModal()
            })
        })
    }
}
