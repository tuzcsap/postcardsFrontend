# postcardsfrontend 
Demo: [hosted on netlify](https://master--soft-fudge-b0e3ee.netlify.app) !Temporary broken due to MongoDB Atlas restrictions for russian IP

Temporary workaround: [ngrok tunnel to localhost](http://4b42-109-234-39-83.ngrok.io)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Docker

#### Build
```
docker build -t postcardsfrontend .
```
#### Run
```
docker run -it -p 8080:80 --rm --name postcardsfrontend postcardsfrontend
``` 
