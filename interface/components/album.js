export class Album {
    constructor(root, id, img, title, text, alt) {
        this.root = root
        this.id = id
        this.img = img
        this.title = title
        this.text = text
        this.alt = alt
    }

    render() {
        this.root.innerHTML = `
            <div id="${this.id}" class="group relative overflow-hidden rounded-lg shadow-md cursor-pointer">
                <img src="${this.img}"
                     alt="${this.alt}"
                     class="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div class="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center text-xs sm:text-sm p-1 sm:p-2 truncate">
                    ${this.title}
                </div>
            </div>
        `;
    }
}

