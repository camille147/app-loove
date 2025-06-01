export class ConnectionView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = ` 
            <div class="p-4">
                <button class="btn btn-outline btn-secondary mb-4" data-view="home" id="home">← Retour</button>
            </div>

            <div class="flex flex-col items-center justify-center min-h-screen text-center px-4">
                <div class="mb-6">
                    <img src="logo.png" alt="TrackShots Logo" class="w-24 h-24 object-contain mx-auto"/>
                </div>
                
                <div class="card w-full max-w-sm shadow-xl bg-base-100">
                    <div class="card-body">
                        <form id="login-form" class="space-y-4">
                            <div class="form-control">
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Votre adresse mail" 
                                    class="input input-bordered w-full" 
                                    required
                                />
                            </div>

                            <div class="form-control">
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="Votre mot de passe" 
                                    class="input input-bordered w-full" 
                                    required 
                                    minlength="12"
                                />
                            </div>

                            <div class="text-left">
                                <a href="#" class="link link-hover text-sm">Mot de passe oublié ?</a>
                            </div>

                            <div id="show_message" class="text-error text-sm"></div>

                            <div>
                                <button 
                                    type="submit" 
                                    id="connection" 
                                    class="btn btn-primary w-full mt-2"
                                >
                                    Se connecter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `
        this.bindEvents()

    }
    bindEvents() {
        document.getElementById('home').addEventListener('click', () => {
            this.navigate("home")
        })
        const form = document.getElementById('login-form')
        const btnSubmit = document.getElementById('connection')
        btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault()
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value


            if (this.onSubmit) {
                try {
                    await this.onSubmit({ email, password })
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


