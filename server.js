//jshint esversion:6
const fs = require('fs');
const net = require('net');
const PORT = 8080;
const path = require('path');


let filePath;
const server = net.createServer((request) =>{


  request.on('data', (data) => {
    const context = data.toString().split('\r\n');
    const headerLine = context[0].split(' ');
    const method = headerLine[0];
    var uri = headerLine[1];
    const versionHTTP = headerLine[2];
    console.log(headerLine);


    let filePath = "." + uri ;
    console.log('FILEPATH:' + filePath);
    if(filePath === './'){
      filePath = 'index.html';
    }

    fs.readFile(filePath, (err, data) => {
      if (err){
        request.write(standardHeader('error404.html', '404 Not Found', data));
        console.log(standardHeader('error404.html', '404 Not Found', data));
      }else{
        request.write(standardHeader(filePath, '200 OK', data));
        console.log(standardHeader(filePath, '200 OK', data));
        request.end();
      }
    });
  });
});


server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


function standardHeader (filePath, status, data){
  return `HTTP/1.1 ${status}
  Server: mozilla 5.0
  Date: ${new Date()}
  Content-Type: text/html, text/css; charset=utf-8;
  Content-Length: ${data.length}
  Connection: keep-alive;

  ${data}`;
}



