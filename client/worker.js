self.addEventListener('push', e => {
    
    const data = e.data.json()

    // Show notification
    self.registration.showNotification(data.title, {
        body: 'Web Push Test',
        icon: 'https://png.pngtree.com/svg/20170719/icon_message_notification_351570.png'
    })

})