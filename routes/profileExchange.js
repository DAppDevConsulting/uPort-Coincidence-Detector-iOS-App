const express = require('express')
const router = express.Router()
const equal = require('deep-equal')

const phoneBumpTime = (process.env.PHONE_BUMP_TIME || 2) * 1000
const otherGesturesTime = (process.env.OTHER_GESTURES_TIME || 2) * 1000

var gestures = []

router.post('/hand-dance', function(req, res, next) {
    let gesture = req.body.gesture
    if (!gesture) {
        res.status(400).send({error: 'requestId is empty', success: false})
        return
    }
    let profile = req.body.profile || null

    getProfilesForGesture(gesture, profile, otherGesturesTime).then((profiles) => {
        res.send({profiles, success: true})
    })
})

router.post('/phone-bump', function(req, res, next) {
    let gesture = 'phone-bump'
    let profile = req.body.profile || null

    getProfilesForGesture(gesture, profile, phoneBumpTime).then((profiles) => {
        res.send({profiles, success: true})
    })
})

function getProfilesForGesture (gestureName, myProfile, maxTime) {
    gestures.push({
        name: gestureName,
        profile: myProfile,
        time: Date.now()
    })

    return new Promise((resolve) => {
        setTimeout(() => {
            let profiles = gestures.filter((gesture) => {
                return gesture.name == gestureName &&
                    gesture.profile &&
                    !equal(gesture.profile, myProfile) &&
                    gesture.time > Date.now() - maxTime*2 // x2 because we wait maxTime ms to respond
            }).reduce((profiles, currentGesture) => {
                return profiles.find(profile => {
                    return equal(profile, currentGesture.profile)
                }) ? profiles : [...profiles, currentGesture.profile]
            }, [])

            resolve(profiles)

        }, maxTime)
    })
}

setInterval(() => {
    gestures = gestures.filter((gesture) => {
        return gesture.time < Date.now() - 5e3 ? null : gesture
    })
}, 1e3)

module.exports = router
