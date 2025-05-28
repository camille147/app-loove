export class ProfileUserView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <h1>Profil</h1>
            <div class="container py-5">
              <div class="text-center">
                <img src="" alt="Avatar" class="profile-avatar mb-3">
                <h3 class="fw-bold">Camille</h3>
                <p class=" mb-2">dev</p>
                <p class="">
                  <i class="bi bi-envelope me-1"></i> fdvdfv@ref.com<br>
                </p>
                <div class="d-grid gap-2 d-md-block">
                  <button class="btn btn-primary">Modifier le profil</button>
                  <button class="btn btn-outline-secondary">Paramètres</button>
                </div>
              </div>
            </div>
        `
    }

}