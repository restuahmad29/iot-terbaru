import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY || "app-key",
    // GANTI IP di bawah ini dari 192.168.1.7 menjadi 10.192.190.231
    wsHost: import.meta.env.VITE_REVERB_HOST || "192.168.1.82",
    wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
    forceTLS: false,
    enabledTransports: ["ws"],
});

export default echo;