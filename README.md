# API

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

## POST /phone-bump

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
