const accessTokenEventBus = require('./accessTokenEventBus')


module.exports = function accessTokenTopic (resolveEventId, callbackUrl) {
    return function () {
        let topic = new Promise((resolve, reject) => {
            accessTokenEventBus.once(resolveEventId, (accessToken) => {
                resolve(accessToken)
            })
        })
        topic.cancel = () => console.log('topic canceled')
        topic.url = callbackUrl

        return topic
    }
}