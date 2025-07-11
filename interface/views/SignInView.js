export class SignInView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null
    }

    render() {
        this.root.innerHTML = `
            <div class="min-h-screen bg-base-100 text-base-content px-4 py-6">
  <div class="mb-6">
    <button class="btn btn-outline red-color" id="home">← Retour</button>
  </div>

  <div class="max-w-2xl mx-auto text-center space-y-6">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-widest text-red-500 drop-shadow-lg">
      Inscription
    </h1>

    <form id="sign-in-form" class="space-y-6">
      <div class="card w-full bg-base-100 shadow-xl p-6 space-y-4">
        <div class="form-control">
          <label class="label" for="username">Pseudo</label>
          <input type="text" id="username-sign-in" class="input input-bordered" required minlength="2" />
        </div>

        <div class="form-control">
          <label class="label" for="email">Adresse e-mail</label>
          <input type="email" id="email-sign-in" class="input input-bordered" required placeholder="mail@site.com" />
          <div class="validator-hint text-sm text-gray-500">Entrez une adresse e-mail valide</div>
        </div>

        <div class="form-control relative">
          <label class="label" for="password">Mot de passe</label>
          <input type="password" id="password-sign-in" class="input input-bordered pr-10 w-full" required minlength="12" />
          <button type="button" data-target="password-sign-in" class="absolute right-3 top-10 text-gray-500 eye-password">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="form-control relative">
          <label class="label" for="confirmPassword">Confirmer le mot de passe</label>
          <input type="password" id="confirmPassword-sign-in" class="input input-bordered pr-10 w-full" required />
          <button type="button" data-target="confirmPassword-sign-in" class="absolute right-3 top-10 text-gray-500 eye-password">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="form-control">
          <label class="label" for="photo">Photo de profil</label>
          <input type="file" id="photo" class="file-input file-input-bordered" accept="image/*" required />
        </div>

        <div class="form-control">
          <label class="label" for="bio">Biographie</label>
          <input type="text" id="bio-sign-in" class="input input-bordered" required />
        </div>

        <div class="form-control">
          <label class="cursor-pointer label">
            <input type="checkbox" class="checkbox" id="terms" required />
            <span class="label-text ml-2">J'accepte les <a class="link link-primary" href="#">conditions d'utilisation</a></span>
          </label>
        </div>

        <div id="show_message" class="text-error text-sm"></div>

        <button type="submit" id="sign-in-btn" class="btn red-color-background w-full mt-2">
          S'inscrire
        </button>
      </div>
    </form>
  </div>
</div>

        `
        this.bindEvents()
    }
    bindEvents() {
        document.getElementById('home').addEventListener('click', () => {
            this.navigate("home")
        })
        const form = document.getElementById('sign-in-form')
        const btnSignIn = document.getElementById('sign-in-btn')
        const btnShowPassword = document.querySelectorAll('.eye-password')

        btnShowPassword.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target')
                const inputSelect = document.getElementById(targetId)
                const iconSelect = btn.querySelector('i')
                const isHidden = inputSelect.type === 'password'

                inputSelect.type = isHidden ? 'text' : 'password'
                iconSelect.classList.toggle('fa-eye', !isHidden)
                iconSelect.classList.toggle('fa-eye-slash', isHidden)
            })


        })


        btnSignIn.addEventListener('click', async (e) => {
            e.preventDefault()
            if (!form.checkValidity()) {
                form.reportValidity()
                return
            }
            const username = document.getElementById('username-sign-in').value.trim()
            const email = document.getElementById('email-sign-in').value.trim()
            const password = document.getElementById('password-sign-in').value
            const confirmPassword = document.getElementById('confirmPassword-sign-in').value
            const profile_picture = document.getElementById('photo')
            const termsChecked = document.getElementById('terms').checked
            const bio = document.getElementById('bio-sign-in').value.trim()

            if (password !== confirmPassword) {
                this.showMessage("Les mots de passe ne correspondent pas.")
                return
            }

            if (!termsChecked) {
                this.showMessage("Veuillez accepter les conditions d'utilisation.")
                return
            }

            if(profile_picture.files.length === 0) {
                this.showMessage("L'image de couverture est requise")
                return
            }

            const profile_picture_file = profile_picture.files[0]

            if (this.onSubmit) {
                try {
                    await this.onSubmit({ username, email, password, profile_picture_file, bio })
                } catch (error) {
                    console.error("Erreur dans onSubmit:", error)
                }
            } else {
                console.warn("Aucune fonction onSubmit définie.")
            }
        })
    }

    showMessage(text) {
        const messageDiv = document.getElementById('show_message')
        if (messageDiv) messageDiv.textContent = text
    }

}