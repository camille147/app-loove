export class HomeView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-screen text-center bg-base-100 text-base-content font-orbitron">
              <div class="mb-8">
                <h1 class="text-5xl font-bold tracking-widest red-color drop-shadow-lg">TrackShots</h1>
              </div>
            
              <div class="w-full px-4 max-w-xs space-y-4">
                <button
                  id="connection"
                  data-view="connection"
                  class="btn red-color-background btn-wide"
                >
                  Se connecter
                </button>
                <button
                  id="signIn"
                  data-view="signIn"
                  class="btn btn-outline btn-wide"
                >
                  S'inscrire
                </button>
              </div>
            </div>

        `;
        this.bindEvents()
    }

    bindEvents() {
        document.getElementById('connection').addEventListener('click', () => {
            this.navigate("connection");
        })
        document.getElementById('signIn').addEventListener('click', () => {
            this.navigate("signin");
        });
    }

}
