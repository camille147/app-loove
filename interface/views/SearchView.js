export class SearchView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null;
    }

    render() {
        this.root.innerHTML = `
            <h1>Search<h1>
            
        `
    }

}