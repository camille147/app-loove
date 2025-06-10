export class Album {
    constructor(root, album) {
        this.root = root
        this.album = album
    }

    render() {
        this.root.innerHTML = `
            <div>
                <img src="https://www.science-et-vie.com/wp-content/uploads/scienceetvie/2021/11/pourquoi-etoile-mathusalem-doyenne-univers-contredit-pas-big-bang.jpg" class="rounded-lg" />
                <p class="font-semibold mt-1">${this.album.title}</p>
            </div>
        `;
    }
}

