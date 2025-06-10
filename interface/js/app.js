import {Router} from "./router"
import {Navbar} from "../components/navbar"

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app')
    const header = document.getElementById('navbar')

    const router = new Router(root, 'http://app-loove-api.local')
    const navbar = new Navbar((view) => {
        router.navigate(view)
        navbar.setActiveView(view)
    })
    router.setNavbar(navbar)
    router.start("home")
})
