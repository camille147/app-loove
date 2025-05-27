export class Album {
    constructor(root, id, img, title, text, alt) {
        this.root = root
        this.id = id
        this.img = img
        this.title = title
        this.text = text
        this.alt = alt
    }

    render () {
        this.root.innerHTML=  `
            <div class="col">
                <div class="card h-100" id="${this.id}">
                    <img src="${this.img}" class="card-img-top" alt="${this.alt}"/>
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">${this.text}</p>
                    </div>
                </div>
            </div>
        `;
    }
}