const express = require('express')
const router = express.Router()
const uportApp = require('../uport/app')
const accessTokenEventBus = require('../uport/accessTokenEventBus')
const uuid = require('uuid4')

var profiles = {}

router.get('/uport-uri', function(req, res, next) {
    /**
     * 1. Generate random request ID
     * 2. Generate access token callback URL
     * 3. uport.RequestCredentials
     * 4. Return uport link (with request token) to client (iOS)
     * 5. Wait for credentials
     */
    const requestId = req.query.requestId || uuid()
    const callbackUrl = `${req.protocol}://${req.get('host')}/access-token-callback?requestId=${requestId}`

    uportApp.requestCredentials(requestId, callbackUrl, (uri) => {
        const respData = {
            uri: uri,
            profileLocation: `/profile?requestId=${requestId}`,
            success: true
        }
        if (req.get('Accept') == 'application/json') {
            res.send(respData)
        } else {
            res.render('request-token', respData)
        }
    }).then((creds) => {
        console.log('profiles', creds)
        profiles[requestId] = creds
    }, (err) => {
        console.error('error', err)
    })

    setTimeout(() => {
        // clean up profiles for current requestId
        delete profiles[requestId]
    }, 10*60e3) // 10 minutes
})

router.get('/access-token-callback', function(req, res, next) {
    if (!req.query.requestId) {
        res.status(400).send({error: 'requestId is empty', success: false})
        return
    }

    res.render('access-token-callback')
})

router.get('/save-access-token', function(req, res, next) {
    if (!req.query.requestId) {
        res.status(400).send({error: 'requestId is empty', success: false})
        return
    }
    if (!req.query.access_token) {
        res.status(400).send({error: 'access_token is empty', success: false})
        return
    }

    accessTokenEventBus.emit(req.query.requestId, req.query.access_token)

    res.send({success: true})
})

router.get('/profile', function(req, res, next) {
    if (!req.query.requestId) {
        res.status(400).send({error: 'requestId is empty', success: false})
        return
    }

    let profile = profiles[req.query.requestId]
    if (profile) {
        res.send({
            name: profile.name,
            country: profile.country,
            phone: profile.phone,
            image: {
                url: 'https://ipfs.infura.io' + profile.image.contentUrl
            }
        })
    } else {
        res.status(404).send({error: 'Unknown requestId', success: false})
    }
})

module.exports = router
