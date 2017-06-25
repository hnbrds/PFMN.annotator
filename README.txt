###Annotator node server

Node server for video summarization annotator


##Installation

NodeJS environment is necessary.
All required dependencies are listed in the package.json files.
You may have to run npm install to install dependencies for the node 

run “npm install” and them “npm start”


ex) Package.json
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


## Dependencies

- Angular 4.x
- npm
- Node.js
- other npm packages listed in the package.json


## JSON format

{
"vid" : video id,
"name" : editor name,
"cat" : category,
"log" : {"frame" : frame number, "coord" : mouse coordinate [longitude, latitude]},
"hl": {"frame" : frame number, "coord" : highlight coordinate [longitude, latitude]}
}
