import {Navbar} from "../components/navbar";

export class DashboardUserView {
    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
    }

    render() {
        this.root.innerHTML = `
            <h1>regt</h1>
            <div class="container my-4">
                <div class="row row-cols-2 row-cols-md-3 g-3">
                    
                </div>
            </div>
        `
    }

}