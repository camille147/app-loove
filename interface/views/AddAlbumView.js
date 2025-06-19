export class AddAlbumView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
             <div class="max-w-xl mx-auto p-6 bg-base-100 rounded-xl shadow-xl text-base-content font-orbitron mt-10">
              <h1 class="text-3xl font-bold text-center red-color mb-6">Créer un Album</h1>

              <form id="createAlbumForm">
                <div class="form-control mb-4">
                  <label for="albumName" class="label">
                    <span class="label-text">Nom de l'album</span>
                  </label>
                  <input type="text" id="albumName" placeholder="Ex: Vacances 2025" required
                    class="input input-bordered w-full" />
                </div>

                <div class="form-control mb-4">
                  <label for="albumDesc" class="label">
                    <span class="label-text">Description</span>
                  </label>
                  <textarea id="albumDesc" rows="3" placeholder="Décrivez brièvement l'album..."
                    class="textarea textarea-bordered w-full"></textarea>
                </div>

                <div class="form-control mb-4">
                  <label for="creationDate" class="label">
                    <span class="label-text">Date de création</span>
                  </label>
                  <input type="date" id="creationDate" class="input input-bordered w-full" />
                </div>

                <div class="form-control mb-4">
                  <label for="coverImage" class="label">
                    <span class="label-text">Image de couverture</span>
                  </label>
                  <input type="file" id="coverImage" accept="image/*" class="file-input file-input-bordered w-full" />
                </div>

                <div class="form-control mb-4">
                  <label class="label">
                    <span class="label-text">Visibilité</span>
                  </label>
                  <div class="flex gap-4">
                    <label class="label cursor-pointer">
                      <input type="radio" name="visibility" value="public" id="public" class="radio checked:bg-error" checked />
                      <span class="label-text ml-2">Public</span>
                    </label>
                    <label class="label cursor-pointer">
                      <input type="radio" name="visibility" value="private" id="private" class="radio checked:bg-error" />
                      <span class="label-text ml-2">Privé</span>
                    </label>
                  </div>
                </div>

                <div id="message" class="text-error text-center mb-4"></div>

                <div>
                  <button type="submit" class="btn red-color-background w-full">Créer l'album</button>
                </div>
              </form>
            </div>

        `
        this.bindEvents()
    }

    bindEvents() {
        const form = document.getElementById('createAlbumForm')
        const messageDiv = document.getElementById('message')

        form.addEventListener('submit', async (e) => {
            e.preventDefault()
            messageDiv.textContent = ''

            const albumName = document.getElementById('albumName').value.trim()
            const albumDesc = document.getElementById('albumDesc').value.trim()
            const creationDate = document.getElementById('creationDate').value
            const coverImageInput = document.getElementById('coverImage')
            const visibility = document.querySelector('input[name="visibility"]:checked').value

            if (!albumName) {
                messageDiv.textContent = "Le nom de l'album est requis."
                return
            }

            if (coverImageInput.files.length === 0) {
                messageDiv.textContent = "L'image de couverture est requise."
                return
            }

            const coverImageFile = coverImageInput.files[0]

            if (this.onSubmit) {
                try {
                    await this.onSubmit({
                        title: albumName,
                        description: albumDesc,
                        creationDate,
                        visibility,
                        coverImageFile,
                    })
                } catch (error) {
                    messageDiv.textContent = error.message || "Erreur lors de la création de l'album."
                    console.error(error)
                }
            } else {
                console.warn("Aucune fonction onSubmit définie.")
            }
        })
    }

    showMessage(text) {
        const messageDiv = document.getElementById('message')
        if (messageDiv) messageDiv.textContent = text

    }

}