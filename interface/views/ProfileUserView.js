import {UserModel} from "../models/UserModel";

export class ProfileUserView {
    constructor(root, navigate, user) {
        this.root = root
        this.navigate = navigate
        this.user = user
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <div class="p-4">
                <button class="btn btn-outline red-color mb-4" id="disconnection">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
            <div class="min-h-screen bg-white text-gray-800 font-sans">
              <div class="relative">
                <img src="https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2021/11/pourquoi-etoile-mathusalem-doyenne-univers-contredit-pas-big-bang.jpg" class="w-full h-40 object-cover" />
                
                <div class="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                  <div class="avatar">
                    <div class="w-24 rounded-full ring ring-white ring-offset-2">
                      <img src="../uploads/profile_pictures/${this.user.user.profile_picture}" />
                    </div>
                  </div>
                </div>
              </div>
            
              <div class="mt-12 text-center px-4">
                <h2 class="font-bold text-lg">${this.user.user.username}</h2>
                <p class="text-sm text-gray-500">${this.user.user.bio}</p>
              </div>
            </div>

        `
        this.bindEvents()
    }

    bindEvents() {

        const btnDisconnection = document.getElementById('disconnection')
        btnDisconnection.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("logout")

        })
    }

}