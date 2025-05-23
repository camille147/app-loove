import { PostController } from '../controllers/PostController.js';
import { HomeView } from '../views/HomeView.js';
import { FormView } from '../views/FormView.js';

const root = document.getElementById('app');

const controller = new PostController(root);

const routes = {
    home: () => new HomeView(root).render(),
    posts: () => controller.showAllPosts(),
    form: () => new FormView(root).render(),
};

function router(view) {
    if (routes[view]) {
        routes[view]();
    } else {
        root.innerHTML = "<h2>404 - Vue inconnue</h2>";
    }
}

document.querySelectorAll('button[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        router(view);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    router('home');
});
