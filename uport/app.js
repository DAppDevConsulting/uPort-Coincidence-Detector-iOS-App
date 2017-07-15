const uportConnect = require('uport-connect')
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

const uPort = new Connect('CD App', {
    clientId: process.env.UPORT_APP_ID,
    signer: SimpleSigner(process.env.UPORT_SIGNING_KEY)
})

module.exports.requestCredentials = function (uriCallback) {
    return uPort.requestCredentials(
        {
            requested: ['name', 'phone', 'country'],
            notifications: true
        },
        uriCallback
    )
}