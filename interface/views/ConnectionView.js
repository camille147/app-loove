export class ConnectionView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = ` 
            <button class="btn custom-btn-2" data-view="home" id="home"> Retour </button>
            <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                
                <div class="logo-container mb-4">
                    <img src="logo.png" alt="HeartBloom Logo" name="logo-img mb-2"/>
                </div>
            
                <div class="form-box p-4 mb-4">
                    <form id="login-form">
                        <div class="mb-3">
                            <input type="email" name="email" class="form-control" id="email" placeholder="Votre adresse mail" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" name="password" class="form-control" id="password" placeholder="Votre mot de passe" required minlength="12">
                        </div>
                        <div class="text-start mb-3">
                            <a href="#" name="forgot-password">Mot de passe oublié ?</a>
                        </div>
                        <div id="show_message"></div>
                         <div class="text-start mb-3 mt-3">
                            <button class="btn btn-primary custom-btn-1 w-100 mb-3" type="submit" id="connection"> Se connecter </button>
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
            console.log("home")
        })
        const form = document.getElementById('login-form')
        const btnSubmit = document.getElementById('connection')
        btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault()
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value


            if (this.onSubmit) {
                try {
                    console.log("onSubmit")
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


