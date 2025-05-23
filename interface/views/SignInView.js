export class SignInView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <button class="btn custom-btn-2" data-view="home" id="home"> Retour </button>
            <form class="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">

                <div className="mb-3 text-start">
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input type="" className="form-control custom-input" id="name" placeholder="Votre nom" required/> //
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="firstName" className="form-label">Prénom</label>
                    <input type="" className="form-control custom-input" id="firstName" placeholder="Votre prénom" required/> //
                </div>
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
        `
        this.bindEvents()
    }
    bindEvents() {
        document.getElementById('home').addEventListener('click', () => {
            this.navigate("home")
        })
    }

}