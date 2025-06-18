import {UserModel} from "../models/UserModel";

export class AdminProfileView {
    constructor(root, navigate, user, ) {
        this.root = root
        this.navigate = navigate
        this.user = user
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            
      <div class="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
  <!-- Photo de profil -->
  <div class="flex flex-col items-center">
    <img
      src="http://app-loove-interface.local/uploads/profile_pictures/${this.user.user.profile_picture}"
      alt="Photo de profil"
      class="w-32 h-32 rounded-full object-cover shadow-md"
    />
    <h2 class="mt-4 text-xl font-semibold text-gray-800">${this.user.user.username}</h2>
    <p class="text-sm text-gray-500">${this.user.user.email}</p>
  </div>

  <!-- Bio -->
  <div class="mt-6">
    <p class="mt-2 text-gray-600">${this.user.user.bio}</p>
  </div>

  <!-- Bouton Modifier -->
  <div class="mt-6 text-center">
    <button class="btn btn-outline btn-primary btn-sm px-4" id="modification">
      <i class="fa-solid fa-pen mr-2"></i> Modifier le profil
    </button>
  </div>
</div>




        `
        this.bindEvents()
    }

    bindEvents() {


        const btnModification = document.getElementById('modification')
        btnModification.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("modification")
        })
    }

}