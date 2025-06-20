import {AuthModel} from "../models/AuthModel";

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
  <button class="text-red-600 hover:text-red-800 transition-all" id="return">
    <i class="fa-solid fa-arrow-left text-xl"></i>
  </button>
</div>

<div class="max-w-2xl mx-auto bg-base-100 shadow-xl rounded-xl p-6 sm:p-8 space-y-6">
  <h2 class="text-2xl sm:text-3xl font-bold">Modifier le profil</h2>

  <form id="editProfileForm" class="space-y-6" enctype="multipart/form-data" method="POST">

<div class="w-full flex justify-center">
      <label for="profilePictureInput" class="cursor-pointer group relative">
        <div class="avatar">
          <div class="w-24 sm:w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 transition group-hover:opacity-80">
            <img id="profilePreview" src="http://app-loove-interface.local/uploads/profile_pictures/${this.user.user.profile_picture}" alt="Photo de profil actuelle" />
          </div>
        </div>
        <div class="text-sm text-center text-gray-500 group-hover:text-primary transition mt-1">Changer</div>
      </label>
      <input type="file" name="photo" id="profilePictureInput" accept="image/*" class="hidden" />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Nom de profil</span>
      </label>
      <input type="text" name="username" value="${this.user.user.username}" class="input input-bordered w-full" required />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" name="email" value="${this.user.user.email}" class="input input-bordered w-full" required />
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Bio</span>
      </label>
      <textarea name="bio" class="textarea textarea-bordered w-full resize-none" rows="4">${this.user.user.bio}</textarea>
    </div>

    <div class="pt-2">
      <button type="submit" class="btn btn-primary w-full text-base">Enregistrer les modifications</button>
    </div>

  </form>
</div>

      `

        this.bindEvents()
    }

    bindEvents(){

        const btnReturn = document.getElementById('return')
        btnReturn.addEventListener('click', async (e) => {
            e.preventDefault()
            if(this.user.user.role === 0) {
                this.navigate("profileUser")

            } else {
                this.navigate("adminProfile")

            }
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

            e.preventDefault()

            const username = document.querySelector('input[name="username"]').value.trim()
            const email = document.querySelector('input[name="email"]').value.trim()

            const bio = document.querySelector('textarea[name="bio"]').value.trim()
            const profile_picture_file = document.getElementById('profilePictureInput')
            const picture = profile_picture_file.files[0] || null

            const formData = new FormData(form);

            if (this.onSubmit) {
                try {
                    await this.onSubmit(formData)
                } catch (error) {
                    alert(error.message || "Erreur lors de la mise à jour du profil.")
                }

            }
        })
    }
}