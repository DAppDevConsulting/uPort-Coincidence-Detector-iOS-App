# API

## GET /uport-uri

Request headers:
```
Accept: application/json
```

Response body:
```
{
    uri: uri,
    profileLocation: "/profile?requestId=XXX",
    success: true
}
```

## GET /profile

Query params:

* `requestId` (string)

Response body:
```
{
    country: (string)
    phone: (string)
    image: (string)
}
```

## POST /hand-dance

Request body:
```
{
  xAcceleration: <float>,
  yAcceleration: <float>,
  zAcceleration: <float>,
  date: <float>
}
```

Response body:
```
{
    success: true
}
```
