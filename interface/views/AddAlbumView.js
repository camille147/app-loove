export class AddAlbumView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <div class="container mx-auto max-w-xl px-4 py-8 text-black border-black font-orbitron bg-white rounded-xl shadow-xl">
              <h1 class="text-3xl text-center text-red-600 font-bold mb-6">Créer un Album</h1>
            
              <form>
                <div class="mb-4">
                  <label for="albumName" class="block mb-1">Nom de l'album</label>
                  <input type="text" id="albumName" placeholder="Ex: Vacances 2025" required
                    class="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-red-500">
                </div>
            
                <div class="mb-4">
                  <label for="albumDesc" class="block mb-1">Description</label>
                  <textarea id="albumDesc" rows="3" placeholder="Décrivez brièvement l'album..."
                    class="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-red-500"></textarea>
                </div>
            
                <div class="mb-4">
                  <label for="creationDate" class="block mb-1">Date de création</label>
                  <input type="date" id="creationDate"
                    class="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-red-500">
                </div>
            
                <div class="mb-4">
                  <label for="coverImage" class="block mb-1">Image de couverture</label>
                  <input type="file" id="coverImage" accept="image/*"
                    class="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none">
                </div>
            
                <div class="mb-4">
                  <label class="block mb-2">Visibilité</label>
                  <div class="flex gap-4">
                    <label class="flex items-center">
                      <input type="radio" name="visibility" value="public" id="public" checked
                        class="mr-2 text-red-500 focus:ring-red-500">
                      Public
                    </label>
                    <label class="flex items-center">
                      <input type="radio" name="visibility" value="private" id="private"
                        class="mr-2 text-red-500 focus:ring-red-500">
                      Privé
                    </label>
                  </div>
                </div>
            
                <div class="mb-4">
                  <label class="block mb-2">Étiquettes</label>
                  <div class="grid grid-cols-2 gap-2 tags">

                  </div>
                </div>
            
                <div>
                  <button type="submit"
                    class="w-full py-3 rounded bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wide transition duration-300">
                    Créer l'album
                  </button>
                </div>
              </form>
            </div>

        `
    }

}