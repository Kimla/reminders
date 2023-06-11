import { registerServiceWorker } from "./Utils/sw.js";

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

if ("serviceWorker" in navigator) {
    registerServiceWorker();
}
