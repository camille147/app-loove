export class PublicsAlbumsComponent {
    constructor(publicsAlbums = []) {
        this.publicsAlbums = publicsAlbums
    }

    render() {
        if (!this.publicsAlbums.length) {
            return `<p class="p-4 text-gray-600">Aucune photo favorite trouvée.</p>`
        }

        return `
                <div class="albums-container flex flex-wrap gap-4">
        ${this.publicsAlbums
            .map(
                (album, index) => `
          <div class="card card-sm bg-base-100 w-96 shadow-sm cursor-pointer" data-album-index="${index}">
            <figure>
              <img src="http://app-loove-interface.local/uploads/${album.img_profile_album}" alt="${album.title}" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${album.title}</h2>
            </div>
          </div>
        `
            )
            .join('')}
      </div>

      <!-- Modal -->
      <dialog id="album_modal" class="modal">
        <div class="modal-box max-w-3xl p-4 space-y-4">
          <h3 id="modal-album-title" class="text-lg font-bold"></h3>
          <p id="modal-album-desc" class="text-sm text-gray-600"></p>
          <div id="modal-album-photos" class="grid grid-cols-3 gap-4 mt-4">
            <!-- Photos go here -->
          </div>
          <form method="dialog" class="modal-backdrop">
            <button class="btn btn-sm btn-primary">Fermer</button>
          </form>
        </div>
      </dialog> 
            `
    }

    bindEvents(container) {
        const albumCards = container.querySelectorAll('[data-album-index]')
        const modal = container.querySelector('#album_modal')
        const modalTitle = container.querySelector('#modal-album-title')
        const modalDesc = container.querySelector('#modal-album-desc')
        const modalPhotos = container.querySelector('#modal-album-photos')

        albumCards.forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.getAttribute('data-album-index'), 10);
                const album = this.publicsAlbums[index]

                modalTitle.textContent = album.title;
                modalDesc.textContent = album.description;

                modalPhotos.innerHTML = '';

                if (album.photos && album.photos.length) {
                    album.photos.forEach(photo => {
                        const img = document.createElement('img')
                        img.src = `http://app-loove-interface.local/uploads/photos/${photo.filename}`
                        img.alt = photo.title || ''
                        img.classList.add('w-full', 'h-auto', 'rounded', 'shadow-sm');
                        modalPhotos.appendChild(img)
                    });
                } else {
                    modalPhotos.innerHTML = '<p class="text-gray-500">Pas de photos dans cet album.</p>';
                }

                // Ouvrir la modal
                modal.showModal();
            });
        });
    }
}