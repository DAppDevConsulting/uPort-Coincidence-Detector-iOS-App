var express = require('express')
var router = express.Router()
var uportApp = require('../uport/app')
var uuid = require('uuid4')

var credentials = {}
var credentialPromises = {}

router.get('/uport-uri', function(req, res, next) {
    const requestId = req.query.requestId || uuid()

    var credentialPromise = uportApp.requestCredentials((uri) => {
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
    })

    credentialPromises[requestId] = credentialPromise
    credentialPromise.then((credentials) => {
        console.log('credentials', credentials)
        credentials[requestId] = credentials
    }, (err) => {
        console.error('error', err)
    })

    setTimeout(() => {
        // clean up credentials and promises for current requestId
        delete credentials[requestId]
        delete credentialPromises[requestId]
    }, 10*60e3) // 10 minutes
})

router.get('/profile', function(req, res, next) {
    if (!req.query.requestId) {
        res.status(400).send({error: 'requestId is empty', success: false})
    }

    let credentials = credentials[req.query.requestId]
    let credentialPromise = credentialPromises[req.query.requestId]
    if (credentials) {
        res.send(credentials)
    } else if (credentialPromise) {
        credentialPromise.then((credentials) => {
            res.send(credentials)
        }, (err) => {
            res.status(400).send({error: 'Could not get profile', success: false})
        })
    } else {
        res.status(404).send({error: 'Unknown requestId', success: false})
    }
})

router.get('/hand-dance', function(req, res, next) {
    res.send({success: true})
})

module.exports = router
