//jshint esversion:6
const fs = require('fs');
const net = require('net');
const PORT = 8080;
const path = require('path');


const indexHTML = `/index.html`;
const hydrogenHTML = `hydrogen.html`;
const helium = `helium.html`;
const html404 = `404.html`;
const css = `css/styles.css`;

let filePath;
const server = net.createServer((request) =>{


  request.on('data', (data) => {
    const context = data.toString().split('\r\n');
    const headerLine = context[0].split(' ');
    const method = headerLine[0];
    const uri = headerLine[1];
    const versionHTTP = headerLine[2];
    console.log(headerLine);

/*  if(uri){
    let filePath = "./" + uri ;
    fs.readFile(filePath, (err, data) => {
      if (err){
        console.log(standardHeader('404.html') + data);
        request.write(standardHeader('404.html') + data);
        request.end();
      }else{
        request.write(standardHeader(filePath) + data.toString());
        console.log(standardHeader(filePath) + data.toString());
        request.end();
      }
    });
  }
  });
});
*/
    if(uri){
      let filePath = "." + uri ;
      console.log('FILEPATH:' + filePath);
      fs.readFile(filePath, (err, data) => {
        if (err){
          console.log(standardHeader('error404.html') + data);
          request.write(standardHeader('error404.html') + data);
        }else if(filePath === './'){
          request.write(standardHeader('index.html') + data.toString());
          console.log(standardHeader('index.html') + data.toString());
        }else{
          request.write(standardHeader(filePath) + data.toString());
          console.log(standardHeader(filePath) + data.toString());
          request.end();
        }
      });
    }
  });
});




server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

function standardHeader (data){
  return `HTTP/1.1 200 OK
  Server: mozilla 5.0
  Date: ${new Date()}
  Content-Type: text/html; charset=utf-8;
  Content-Length: ${data.length}
  Connection: keep-alive;

  `;
}




