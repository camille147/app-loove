export class ModificationAlbumView {
    constructor(root, navigate, album) {
        this.root = root
        this.navigate = navigate
        this.album = album
        this.onSubmit = null
    }


    render() {
        this.root.innerHTML = `
        
        <div class="p-4">
        <button class="ml-auto gap-2 text-red-600 hover:text-red-800 transition-all" id="cancelBtn">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </button>
      </div>
        <form id="editAlbumForm" enctype="multipart/form-data"  method="POST">
        
        
        <div class="form-control">
        

          <label for="profilePictureInput" class="cursor-pointer w-fit">
            <div class="album_img">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:opacity-80 transition">
                <img id="profilePreview" src="http://app-loove-interface.local/uploads/${this.album.album.img_profile_album}" alt="Photo de profil actuelle" />
              </div>
            </div>
          </label>
        
          <!-- Input caché -->
          <input type="file" name="photo" id="profilePictureInput" accept="image/*" class="hidden" />
                
      </div>
      
               <div class="mb-4">
                    <label class="block text-sm font-medium">Titre</label>
                    <input type="text" name="title" value="${this.album.album.title || ''}" class="input input-bordered w-full" required>
               </div>
               
               <div class="mb-4">
                    <label class="block text-sm font-medium">Description</label>
                    <textarea name="description" class="textarea textarea-bordered w-full">${this.album.album.description || ''}</textarea>
                </div>
        
        
                <div class="form-control mb-4">
  <label class="label">
    <span class="label-text">Visibilité</span>
  </label>
  <div class="flex gap-4">
    <label class="label cursor-pointer">
      <input type="radio" name="visibility" value="public" id="public"
        class="radio checked:bg-error"
        ${this.album.album.visibility === 'public' ? 'checked' : ''} />
      <span class="label-text ml-2">Public</span>
    </label>
    <label class="label cursor-pointer">
      <input type="radio" name="visibility" value="private" id="private"
        class="radio checked:bg-error"
        ${this.album.album.visibility === 'private' ? 'checked' : ''} />
      <span class="label-text ml-2">Privé</span>
    </label>
  </div>
</div>

                
                
                <div class="mt-4">
  <button type="submit" class="btn btn-primary">Mettre à jour</button>
</div>
                
        </form>

`

        this.bindEvents()
    }


    bindEvents() {
        const form = this.root.querySelector('#editAlbumForm')
        const profileInput = document.getElementById('profilePictureInput')
        const previewImg = document.getElementById('profilePreview')
        const retourBtn = this.root.querySelector('#cancelBtn')

        profileInput.addEventListener('change', () => {
            const file = profileInput.files[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                    previewImg.src = reader.result
                }
                reader.readAsDataURL(file)
            }
        })

        retourBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigate(`albums/${this.album.album.id}`); // ou autre route retour
        })


        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const title= document.querySelector('input[name="title"]').value.trim()
            const description = document.querySelector('textarea[name="description"]').value.trim()
            const visibility = document.querySelector('input[name="visibility"]:checked').value
            const profile_picture_file = document.getElementById('profilePictureInput')
            const picture = profile_picture_file.files[0] || null
            console.log(this.album.album.profile_picture_file)
            console.log(picture)

            console.log(profile_picture_file.files[0])

            const formData = new FormData()
            formData.append("title", title)
            formData.append("description", description)
            formData.append("visibility", visibility)
            formData.append("album_id", this.album.album.id)

            if (picture) {
                formData.append("img_profile_album", picture)  // 👈 utiliser le bon nom attendu
            }
            console.log(formData)
            if (this.onSubmit) {
                try {
                    await this.onSubmit(formData);  // passe le FormData
                } catch (error) {
                    alert(error.message || "Erreur lors de la mise à jour d'un album.")
                }

            }


        })
    }

}
