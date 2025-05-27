import {Router} from "./router"
import {Navbar} from "../components/navbar"

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app')
    const header = document.getElementById('navbar')

    const router = new Router(root)
    const navbar = new Navbar((view) => {
        router.navigate(view)
        navbar.setActiveView(view)
    })
    navbar.mount(header)
    router.setNavbar(navbar)
    router.start("home")

})
