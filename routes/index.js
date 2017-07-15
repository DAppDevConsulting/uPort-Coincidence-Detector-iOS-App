var express = require('express')
var router = express.Router()
var uportApp = require('../uport/app')

router.get('/uport-uri', function(req, res, next) {
    if (!req.query.requestId) {
        res.status(400).send({error: 'requestId is empty'})
    }

    uportApp.requestCredentials((uri) => {
        if (req.get('Accept') == 'application/json') {
            res.send({uri: uri})
        } else {
            res.render('request-token', {uri: uri})
        }
    }).then((credentials) => {
        console.log('creds', credentials)
    }, (err) => {
        console.error('error', err)
    })
})

module.exports = router;
