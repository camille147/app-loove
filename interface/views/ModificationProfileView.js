import {UserModel} from "../models/UserModel";

export class ModificationProfileView {
    constructor(root, navigate, user) {
        this.root = root
        this.navigate = navigate
        this.user = user
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <div class="p-4">
        <button class="ml-auto gap-2 text-red-600 hover:text-red-800 transition-all" id="return">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </button>
      </div>
      
       <div class="max-w-xl mx-auto bg-base-100 shadow-xl rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">Modifier le profil</h2>
    <form id="editProfileForm" class="space-y-4" enctype="multipart/form-data" method="POST">
      
      <div class="form-control">
        

          <label for="profilePictureInput" class="cursor-pointer w-fit">
            <div class="avatar">
              <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 hover:opacity-80 transition">
                <img id="profilePreview" src="http://app-loove-interface.local/uploads/profile_pictures/${this.user.user.profile_picture}" alt="Photo de profil actuelle" />
              </div>
            </div>
          </label>
        
          <!-- Input caché -->
          <input type="file" name="photo" id="profilePictureInput" accept="image/*" class="hidden" />
                
      </div>

      <div class="form-control">
        <label class="label">
            <span class="label-text">Nom de profil</span>
        </label>
        <input type="text" name="username" value="${this.user.user.username}" class="input input-bordered" required />
      </div>
      <div class="form-control">
        <label class="label">
            <span class="label-text">Email</span>
        </label>
        <input type="text" name="email" value="${this.user.user.email}" class="input input-bordered" required />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Bio</span>
        </label>
        <textarea name="bio" class="textarea textarea-bordered" rows="3">${this.user.user.bio}</textarea>
      </div>

      <div class="form-control mt-6">
        <button type="submit" class="btn btn-primary w-full">Enregistrer les modifications</button>
      </div>

    </form>
  </div>
      `

        this.bindEvents()
    }

    bindEvents(){

        //console.log(this.user)
        //console.log(this.user.user.photo)
        const btnReturn = document.getElementById('return')
        btnReturn.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("profileUser")
        })

        const form = document.getElementById('editProfileForm')
        const profileInput = document.getElementById('profilePictureInput')
        const previewImg = document.getElementById('profilePreview')

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



        form.addEventListener('submit', async (e) => {

            e.preventDefault();

            const username = document.querySelector('input[name="username"]').value.trim()
            const email = document.querySelector('input[name="email"]').value.trim()

            const bio = document.querySelector('textarea[name="bio"]').value.trim()
            const profile_picture_file = document.getElementById('profilePictureInput')
            const picture = profile_picture_file.files[0] || null
            console.log(picture)

            console.log(profile_picture_file.files[0]
        )
            const formData = new FormData(form);

            if (this.onSubmit) {
                try {
                    await this.onSubmit(formData);  // passe le FormData
                } catch (error) {
                    alert(error.message || "Erreur lors de la mise à jour du profil.")
                }

            }
        })
    }
}