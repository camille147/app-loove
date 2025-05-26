export class SignInView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <button class="btn custom-btn-2" data-view="home" id="home"> Retour </button>
            <form class="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center">

              <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" required minlength="2">
              </div>
        
              <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" required minlength="2">
              </div>
        
              <div class="mb-3">
                <label for="email" class="form-label">Adresse e-mail</label>
                <input type="email" class="form-control" id="email" required>
              </div>
        
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" class="form-control" id="password" required minlength="12">
              </div>
        
              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
                <input type="password" class="form-control" id="confirmPassword" required>
              </div>
        
              <div class="mb-3">
                <label for="genre" class="form-label">Genre</label>
                <select class="form-select" id="genre" required>
                  <option value="">Choisissez...</option>
                  <option value="femme">Femme</option>
                  <option value="homme">Homme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
        
              <div class="mb-3">
                <label for="orientation" class="form-label">Orientation sexuelle</label>
                <select class="form-select" id="orientation" required>
                  <option value="">Choisissez...</option>
                  <option value="femme">Attiré(e) par les femmes</option>
                  <option value="homme">Attiré(e) par les hommes</option>
                  <option value="tous">Les deux</option>
                </select>
              </div>
        
              <div class="mb-3">
                <label for="relation" class="form-label">Type de relation recherchée</label>
                <select class="form-select" id="relation" required>
                  <option value="">Choisissez...</option>
                  <option value="serieuse">Sérieuse</option>
                  <option value="amitie">Amitié</option>
                  <option value="fun">Sans prise de tête</option>
                </select>
              </div>
        
              <div class="mb-3">
                <label for="dob" class="form-label">Date de naissance</label>
                <input type="date" class="form-control" id="dob" required>
              </div>
        
              <div class="mb-3">
                <label for="photo" class="form-label">Photo de profil</label>
                <input type="file" class="form-control" id="photo" accept="image/*" required>
              </div>
        
              <div class="mb-3">
                <label for="ville" class="form-label">Ville</label>
                <input type="text" class="form-control" id="ville" required>
              </div>
        
              <div class="mb-3">
                <label for="pays" class="form-label">Pays</label>
                <input type="text" class="form-control" id="pays" required>
              </div>
        
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" required>
                <label class="form-check-label" for="terms">J'accepte les <a href="#">conditions d'utilisation</a></label>
              </div>
        
              <button type="submit" class="btn btn-danger w-100">S'inscrire</button>
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