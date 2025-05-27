export class AddAlbumView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <h1>Ajout Album<h1>
        `
    }

}