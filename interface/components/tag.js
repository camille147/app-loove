export class Tag {
    constructor(root, id, img, title, text, alt) {
        this.root = root
        this.id = id
        this.title = title
    }

    render () {
        this.root.innerHTML=  `
            <span class="bg-red-300 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full ${this.id}">${this.title}</span>
        `;
    }


}


