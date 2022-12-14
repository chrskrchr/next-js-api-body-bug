## next-js-api-body-body

Sample repo to reproduce the request body consumption issue described here:

https://github.com/vercel/next.js/issues/24894

## Repro Steps

1. Clone this repo
2. Run `npm install` (Node v16)
3. Run `npm run dev`
4. Run this command:
    - `curl -v -POST -H "Content-Type: application/json" -d '{"ping":true}' http://localhost:3000/api/test`

You should see a `400 Invalid Body` response like the following:

```
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST /api/test HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.84.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 13
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 400 Invalid body
< Date: Wed, 14 Dec 2022 13:19:46 GMT
< Connection: keep-alive
< Keep-Alive: timeout=72
< Transfer-Encoding: chunked
<
* Connection #0 to host localhost left intact
Invalid body%  
```

Uncomment the no-op content parser in `server.ts` to work around the issue.
