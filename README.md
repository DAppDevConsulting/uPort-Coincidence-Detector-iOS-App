# API

## Base URL

http://207.154.238.203/

## GET /uport-uri

Request headers:
```
Accept: application/json
```

Response body:
```
{
  uri: (string),
  profileLocation: "/profile?requestId=XXX",
  success: true
}
```

## GET /save-access-token

Query params:

* `requestId` (string)
* `access_token` (string)

Response body:
```
{
  success: true
}

```
## GET /profile

Query params:

* `requestId` (string)

Response body:
```
{
  name: (string)
  country: (string)
  phone: (string)
  image: {
    url: (string)
  }
}
```

## POST /profile-exchange/hand-dance

Request body:
```
{
  profile: (object), // Optional. Don't send if transmit mode is off
  gesture: (string)
}
```

Response body:
```
{
  success: true,
  profiles: [
    (profile object 1),
    (profile object 2),
    ...
  ]
}
```

## POST /profile-exchange/phone-bump

Request body:
```
{
  profile: (object), // Optional. Don't send if transmit mode is off
}
```

Response body:
```
{
  success: true,
  profiles: [
    (profile object 1),
    (profile object 2),
    ...
  ]
}
```

# Setup

Create `.env` file with the following content:

```
UPORT_APP_ID=XXX
UPORT_SIGNING_KEY=YYY
```

Optionally you can supply the following variables

```
PHONE_BUMP_TIME=2
OTHER_GESTURES_TIME=2
```

# Deployment

Run `./bin/update-server.sh`  to pull code updates and restart the server
