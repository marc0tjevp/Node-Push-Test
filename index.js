const express = require('express')
const webpush = require('web-push')
const bodyparser = require('body-parser')
const path = require('path')

const app = express()

// Set static path
app.use(express.static(path.join(__dirname, 'client')))
app.use(bodyparser.json())

const publicVapidKey = 'BFV4kf_lkypBfRyJfCBobYFOh8xWpVeYbVs6ZbKwvINbteDPWe5rPYagF_xYqcgpdY70lY__h5tvzSVWhCYyVrs'
const privateVapidKey = 'OPNf7uFO5z6R0CEicKXU5CT-0uapl1-R5HVxqVoarL0'

webpush.setVapidDetails('mailto:marc0tjevp@gmail.com', publicVapidKey, privateVapidKey)

// Subscribe Route
app.post('/subscribe', (req, res) => {
    
    // Get pushSubscription object
    const subscription = req.body

    // Send back status (201 - resource created)
    res.status(201).json({})

    // Create payload (optional)
    const payload = JSON.stringify({title: "Thanks for Subscribing!"})

    // Pass object into sendNotification function
    webpush.sendNotification(subscription, payload).catch(err => console.error(err))

})

const port = 8080;

app.listen(port, () => console.log("Listening..."))