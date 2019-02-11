const publicVapidKey = 'BFV4kf_lkypBfRyJfCBobYFOh8xWpVeYbVs6ZbKwvINbteDPWe5rPYagF_xYqcgpdY70lY__h5tvzSVWhCYyVrs'

// Check for service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}

// Register Service Worker, Register Push, Send Notification
async function send() {

    // Register Service Worker
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '*'
    })

    // Register Push
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })

    // Send subscription to backend
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })

}

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}