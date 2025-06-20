export class SearchView {
    constructor(root, navigate, tags) {
        this.root = root
        this.navigate = navigate
        this.tags = tags
        this.selectedTag = null
    }

    render() {
        this.root.innerHTML = `
            <div class="max-w-xl mx-auto p-4">
                <div class="mb-4">
                    <label for="tagSearch" class="block font-semibold mb-2">Rechercher un tag</label>
                    <input type="text" id="tagSearch" placeholder="Ex: Monaco" class="input input-bordered w-full mb-2" />
                    <div id="tagSuggestions" class="flex flex-wrap gap-2 mb-2"></div>
                </div>
                <div id="photoResults" class="grid grid-cols-2 md:grid-cols-3 gap-4"></div>
            </div>
        `
        this.bindEvents()
    }

    bindEvents() {
        const input = this.root.querySelector('#tagSearch')
        const suggestions = this.root.querySelector('#tagSuggestions')
        const photoResults = this.root.querySelector('#photoResults')

        const renderSuggestions = () => {
            const query = input.value.toLowerCase().trim()
            suggestions.innerHTML = ''

            if (!query) return

            const filtered = this.tags.filter(tag =>
                tag.name.toLowerCase().includes(query)
            )

            if (filtered.length === 0) {
                suggestions.innerHTML = `<span class="text-gray-500 italic">Aucun tag trouvé</span>`
                return
            }

            filtered.forEach(tag => {
                const btn = document.createElement('button')
                btn.type = 'button'
                btn.textContent = tag.name
                btn.className = 'btn btn-sm btn-outline'
                btn.addEventListener('click', () => {
                    input.value = tag.name
                    this.selectedTag = tag.name
                    suggestions.innerHTML = ''
                    this.displayPhotos(tag)
                })
                suggestions.appendChild(btn)
            })
        }

        input.addEventListener('input', renderSuggestions)
    }

    displayPhotos(tag) {
        const container = this.root.querySelector('#photoResults')
        container.innerHTML = ''

        if (!tag || tag.photos.length === 0) {
            container.innerHTML = `<p class="text-gray-500">Aucune photo trouvée pour ce tag.</p>`
            return
        }

        tag.photos.forEach(photo => {
            const card = document.createElement('div')
            card.className = 'rounded overflow-hidden shadow'
            card.innerHTML = `
                <img src="http://app-loove-interface.local/uploads/photos/${photo.filename}" class="w-full h-48 object-cover" alt="${photo.title}" />
                <div class="p-2">
                    <h3 class="font-semibold text-sm">${photo.title}</h3>
                    <p class="text-xs text-gray-500">${photo.description}</p>
                </div>
            `
            container.appendChild(card)
        })
    }
}
