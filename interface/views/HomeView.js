export class HomeView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-screen text-center bg-white text-black font-orbitron">
              <div class="mb-8">
                <h1 class="text-5xl font-bold tracking-widest text-red-600 drop-shadow-lg">TrackShots</h1>
              </div>
            
              <div class="w-full px-4 max-w-xs">
                <button
                  id="connection"
                  data-view="connection"
                  class="w-full mb-4 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg transition duration-300 uppercase tracking-wide"
                >
                  Se connecter
                </button>
                <button
                  id="signIn"
                  data-view="signIn"
                  class="w-full py-3 px-4 bg-white hover:bg-gray-100 text-black rounded-lg shadow-md transition duration-300 uppercase tracking-wide"
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
