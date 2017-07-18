const uportConnect = require('uport-connect')
const accessTokenTopic = require('./topic')
const Connect = uportConnect.Connect
const SimpleSigner = uportConnect.SimpleSigner

if (!process.env.UPORT_APP_ID) {
    console.log('UPORT_APP_ID env var is not set')
    process.exit(1)
}
if (!process.env.UPORT_SIGNING_KEY) {
    console.log('UPORT_SIGNING_KEY env var is not set')
    process.exit(1)
}


module.exports.requestCredentials = function (requestId, accessTokenCallbackUrl, requestTokenCallbackFn) {
    let options = {
        network:  process.env.UPORT_NETWORK || 'rinkeby',
        clientId: process.env.UPORT_APP_ID,
        signer: SimpleSigner(process.env.UPORT_SIGNING_KEY),
        topicFactory: accessTokenTopic(requestId, accessTokenCallbackUrl)
    }
    let uPort = new Connect('CD App', options)

    console.log('connecting to uPort with', JSON.stringify({
        network: options.network,
        clientId: options.clientId
    }))

    return uPort.requestCredentials(
        {
            requested: ['name', 'phone', 'country'],
            notifications: true
        },
        requestTokenCallbackFn
    )
}