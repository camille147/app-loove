import {AuthModel} from "../models/AuthModel";

export class MenuUserView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `

<div class="p-4">
        <button class="ml-auto gap-2 text-red-600 hover:text-red-800 transition-all" id="return">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </button>
      </div>
      
            <div class="p-4">
                <button class="ml-auto flex items-center gap-2 text-red-600 hover:text-red-800 transition-all" id="disconnection">
                  <i class="fa-solid fa-arrow-right-from-bracket text-xl"></i>
                  <span class="hidden sm:inline">Déconnexion</span>
                </button>
            </div>
            <div id="show_message" class="text-error text-sm"></div>

            <div class="p-4">
                <button class="ml-auto flex items-center gap-2 text-red-600 hover:text-red-800 transition-all" id="delete">
                  <i class="fa-solid fa-trash text-xl"></i>
                </button>
            </div>

        `
        this.bindEvents()
    }

    bindEvents() {


        const btnReturn = document.getElementById('return')
        btnReturn.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("profileUser")
        })

        const btnDisconnection = document.getElementById('disconnection')
        btnDisconnection.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("logout")
        })

        const btnDelete = document.getElementById('delete')
        btnDelete.addEventListener('click', async (e) => {
            e.preventDefault()
            this.navigate("delete")
        })

    }

    showMessage(text) {
        const messageDiv = document.getElementById('show_message')
        if (messageDiv) messageDiv.textContent = text
    }

}