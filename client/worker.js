self.addEventListener('push', e => {
    const data = e.data.json()

    // Show notification
    self.registration.showNotification(data.title, {
        body: 'Web Push Test',
        icon: 'https://media.tenor.com/images/805fad219d83c53896d7681d87732d1b/raw'
    })

})