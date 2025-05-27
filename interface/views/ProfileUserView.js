export class ProfileUserView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <h1>Profil<h1>
        `
    }

}