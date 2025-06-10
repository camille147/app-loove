export class HomeView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null
    }

    render() {
        this.root.innerHTML = `
            <div class="min-h-screen flex items-center justify-center  px-4 font-[Inter] background-track">
                <div class="w-full max-w-sm space-y-6 text-center 
                 backdrop-blur-sm rounded-xl p-8 shadow-lg">
            
                    <div>
                        <img src="./assets/logo.png" alt="Logo TrackShots" class="mx-auto w-32 h-32 object-contain" />
                    </div>
            
                    <div>
                        <h1 class="text-2xl font-bold font-orbitron red-color">Welcome to TrackShots!</h1>
                        <p class="text-sm grey-color mt-1">L'appli des passionnés de F1 où chaque moment devient un shot mémorable.</p>
                    </div>
            
                    <form id="login-form" class="space-y-4">
                        <div class="form-control">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value=""
                                class="w-full rounded-full px-4 py-3 black-color placeholder-black-color focus:outline-none focus:ring-3 focus:ring-[#C4C4C4]"
                                required
                            />
                        </div>
                
                        <div class="relative form-control">
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Mot de passe"
                                required
                                class="w-full rounded-full px-4 py-3 pr-10 black-color placeholder-black-color focus:outline-none focus:ring-3 focus:ring-[#C4C4C4]"
                            />
                            <button type="button" class="absolute right-4 top-1/2 transform -translate-y-1/2  eye-password">
                                <i class="fa-solid fa-eye grey-color"></i> 
                            </button>        
                        </div>
                        <div id="show_message" class="text-error text-sm"></div>

                
                        <button
                            id="connection"
                            type="submit"
                            class="w-full red-color-background font-bold py-3 mt-6 rounded-full font-orbitron"
                        >
                            Se connecter
                        </button>    
                    </form>
            
                    <div>
                        <a href="#" class="text-sm red-color hover:underline">Forgot password?</a>
                    </div>
            
                    <div class="text-sm grey-color">
                        Don’t have an account?
                        <a id="signIn" data-view="signIn" href="#" class="red-color hover:underline ml-1">Register!</a>
                    </div>
                    
                </div>
            </div>


        `;
        this.bindEvents()
    }

    bindEvents() {

        document.getElementById('signIn').addEventListener('click', () => {
            this.navigate("signin")
        })

        const form = document.getElementById('login-form')
        const btnSubmit = document.getElementById('connection')

        const passwordInput = document.getElementById('password')
        const btnShowPassword = document.querySelector('.eye-password')

        btnShowPassword.addEventListener('click', () => {

            const iconSelect = btnShowPassword.querySelector('i')
            const isHidden = passwordInput.type === 'password'

            passwordInput.type = isHidden ? 'text' : 'password'
            iconSelect.classList.toggle('fa-eye', !isHidden)
            iconSelect.classList.toggle('fa-eye-slash', isHidden)
        })



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
