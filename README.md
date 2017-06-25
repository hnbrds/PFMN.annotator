# Annotator node server
Node server for video summarization annotator

## Install

run server : "npm install"

runs on port 17358

```
{
  "name": "vrsumm-annotation",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "cd client && ng build --prod && cd ../server && npm start",
    "install": "cd client && npm install && cd ../server && npm install"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@angular/core": "^4.0.2",
    "d3": "^4.8.0",
    "d3-ng2-service": "^1.8.0"
  }
}
```


## Dependencies

- Angular 4.x
- npm
- Node.js
- other npm packages


## JSON format

{<br>
"vid" : video id, <br>
"name" : editor name, <br>
"cat" : category, <br>
"log" : {"frame" : frame number, "coord" : mouse coordinate [longitude, latitude]}, <br>
"hl": {"frame" : frame number, "coord" : highlight coordinate [longitude, latitude]} <br>
}

```
makeData(name) {
  console.log(this.vidCategory);
  return {
    vid : this.videoId.slice(0, -4),
    name : name,
    cat : this.vidCategory,
    log : this.coordSequence,
    hl : this.highLights
  }
}
```
