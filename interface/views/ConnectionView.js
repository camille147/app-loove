export class ConnectionView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = ` 
            <button class="btn custom-btn-2" data-view="home" id="home"> Retour </button>
            <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">
                
                <div className="logo-container mb-4">
                    <img src="logo.png" alt="HeartBloom Logo" className="logo-img mb-2"/>
                    <h1 className="logo-text">HeartBloom</h1>
                </div>
            
                <div className="form-box p-4 mb-4">
                    <form>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control custom-input" id="email" placeholder="Votre email" required/>
                        </div>
                        <div className="mb-2 text-start">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input type="password" className="form-control custom-input" id="password" placeholder="Votre mot de passe" required/>
                        </div>
                        <div className="text-start mb-3">
                            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                        </div>
                    </form>
                </div>
                
                
            
                <a href="#" className="btn custom-btn w-100" style="max-width: 300px;">Se connecter</a>
            </div>
        `
        this.bindEvents()

    }
    bindEvents() {
        document.getElementById('home').addEventListener('click', () => {
            this.navigate("home")
        })
    }

}


