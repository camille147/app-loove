export class AlbumsView {

    constructor(root, navigate) {
        this.root = root
        this.navigate = navigate
        this.onSubmit = null
    }

    render() {
        this.root.innerHTML = `
            <div class="flex justify-center items-center min-h-screen bg-base-100">
                <div class="dropdown">
                    <label tabindex="0" class="btn m-1" id="dropdownButton">
                        Sélectionner un album
                    </label>
                    <ul 
                        id="dropdownList"
                        tabindex="0" 
                        class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
                    >
                        <li><a href="#" data-value="Album 1">Album 1</a></li>
                        <li><a href="#" data-value="Album 2">Album 2</a></li>
                        <li><a href="#" data-value="Album 3">Album 3</a></li>
                    </ul>
                </div>
            </div>
        `
        this.bindEvents()
    }

    bindEvents() {
        const button = document.getElementById('dropdownButton')
        const items = document.getElementById('dropdownList')

        items.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault()
                const selectedText = item.dataset.value
                button.textContent = selectedText
            })
        })
    }

}
