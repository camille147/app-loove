export class AlbumsView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <h1>Tous mes albums<h1>
        `
    }

}