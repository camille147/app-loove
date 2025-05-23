import {Router} from "./router";

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app')
    const router = new Router(root)
    router.start("home")
})

