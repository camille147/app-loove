export class SignInView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="p-4">
                <button class="btn btn-outline red-color mb-4" data-view="home" id="home">← Retour</button>
            </div>

            <form class="flex flex-col items-center justify-center min-h-screen px-4">
                <div class="card w-full max-w-xl bg-base-100 shadow-xl p-6 space-y-4">
                    <div class="form-control">
                        <label class="label" for="username">Pseudo</label>
                        <input type="text" id="username" class="input input-bordered" required minlength="2" />
                    </div>

                    <div class="form-control">
                        <label class="label" for="email">Adresse e-mail</label>
                        <input type="email" id="email" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label" for="password">Mot de passe</label>
                        <input type="password" id="password" class="input input-bordered" required minlength="12" />
                    </div>

                    <div class="form-control">
                        <label class="label" for="confirmPassword">Confirmer le mot de passe</label>
                        <input type="password" id="confirmPassword" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label" for="photo">Photo de profil</label>
                        <input type="file" id="photo" class="file-input file-input-bordered" accept="image/*" required />
                    </div>

                    <div class="form-control">
                        <label class="cursor-pointer label">
                            <input type="checkbox" class="checkbox" id="terms" required />
                            <span class="label-text ml-2">J'accepte les <a class="link link-primary" href="#">conditions d'utilisation</a></span>
                        </label>
                    </div>

                    <button type="submit" class="btn red-color-background w-full mt-2">S'inscrire</button>
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