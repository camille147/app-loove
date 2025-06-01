export class ProfileUserView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <div class="min-h-screen bg-base-100 flex flex-col items-center justify-center p-6">
              <div class="card w-full max-w-md bg-base-200 shadow-xl">
                <figure class="px-10 pt-10">
                  <img src="https://via.placeholder.com/150" alt="Avatar" class="rounded-full w-32 h-32 object-cover">
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title text-2xl font-bold">Camille</h2>
                  <p class="text-sm text-gray-500 mb-1">dev</p>
                  <p class="text-sm text-gray-400">
                    <i class="bi bi-envelope me-1"></i> fdvdfv@ref.com
                  </p>
                  <div class="card-actions mt-4">
                    <button class="btn btn-error">Modifier le profil</button>
                    <button class="btn btn-outline">Paramètres</button>
                  </div>
                </div>
              </div>
            </div>
        `
    }

}