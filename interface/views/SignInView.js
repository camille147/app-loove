export class SignInView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <div class="p-4">
                <button class="btn btn-outline btn-secondary mb-6" data-view="home" id="home">← Retour</button>
            </div>

            <form class="flex flex-col items-center justify-center min-h-screen px-4">
                <div class="card w-full max-w-xl bg-base-100 shadow-xl p-6 space-y-4">
                    <div class="form-control">
                        <label class="label" for="nom">Nom</label>
                        <input type="text" id="nom" class="input input-bordered" required minlength="2" />
                    </div>

                    <div class="form-control">
                        <label class="label" for="prenom">Prénom</label>
                        <input type="text" id="prenom" class="input input-bordered" required minlength="2" />
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
                        <label class="label" for="genre">Genre</label>
                        <select id="genre" class="select select-bordered" required>
                            <option value="">Choisissez...</option>
                            <option value="femme">Femme</option>
                            <option value="homme">Homme</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label" for="orientation">Orientation sexuelle</label>
                        <select id="orientation" class="select select-bordered" required>
                            <option value="">Choisissez...</option>
                            <option value="femme">Attiré(e) par les femmes</option>
                            <option value="homme">Attiré(e) par les hommes</option>
                            <option value="tous">Les deux</option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label" for="relation">Type de relation recherchée</label>
                        <select id="relation" class="select select-bordered" required>
                            <option value="">Choisissez...</option>
                            <option value="serieuse">Sérieuse</option>
                            <option value="amitie">Amitié</option>
                            <option value="fun">Sans prise de tête</option>
                        </select>
                    </div>

                    <div class="form-control">
                        <label class="label" for="dob">Date de naissance</label>
                        <input type="date" id="dob" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label" for="photo">Photo de profil</label>
                        <input type="file" id="photo" class="file-input file-input-bordered" accept="image/*" required />
                    </div>

                    <div class="form-control">
                        <label class="label" for="ville">Ville</label>
                        <input type="text" id="ville" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="label" for="pays">Pays</label>
                        <input type="text" id="pays" class="input input-bordered" required />
                    </div>

                    <div class="form-control">
                        <label class="cursor-pointer label">
                            <input type="checkbox" class="checkbox" id="terms" required />
                            <span class="label-text ml-2">J'accepte les <a class="link link-primary" href="#">conditions d'utilisation</a></span>
                        </label>
                    </div>

                    <button type="submit" class="btn btn-error w-full mt-4">S'inscrire</button>
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