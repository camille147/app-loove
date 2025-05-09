import { ApiClient } from './apiClient.js';

class App {
    constructor() {
        this.api = new ApiClient();
        this.resultDiv = document.getElementById("result");
        this.loadBtn = document.getElementById("loadBtn");
        this.loadBtn.addEventListener("click", () => this.loadData());
    }

    async loadData() {
        const data = await this.api.get("users"); // exemple d’endpoint
        this.displayData(data);
    }

    displayData(data) {
        this.resultDiv.innerHTML = JSON.stringify(data, null, 2);
    }
}

new App();
