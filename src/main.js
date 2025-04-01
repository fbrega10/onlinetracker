"use strict";
const fs = require('node:fs');

const fileName = "../data/file.txt";
const patternMatching = "^https:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-_.~!$&'()*+,;=:@%]*)?$";
  
let data = null;

try {

     data = fs.readFileSync(fileName, 'utf-8')

     let array = data.split('\n');

     let promises = [];

     array.filter((url) => url.match(patternMatching))
     .forEach((url) => {
        promises.push(fetch(url));
     });

     Promise.all(promises)
     .then((all) => all.forEach((res) => {
            console.log(res.url + " " + res.status + " " + res.statusText)
     })).catch(console.error);
     
}
catch(error){
    console.error("Error occurred : " + error);
}
