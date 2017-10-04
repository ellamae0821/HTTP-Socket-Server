
/*jshint esversion: 6 */


//////////////////////
const net = require('net');
const PORT = 8080;
const uri = process.argv[2];



const client = new net.Socket();
//To establish a connection to localhost
if(uri === "localhost"){
  //socket.connect (path, host ) host defaults to localhost
  client.connect(8080, uri, () => {
    client.write(standardHeaderClient(uri));
    console.log('Connected to remote address: ' + client.remoteAddress );
  });
}else{
  if(uri !== undefined){
    client.connect(80, uri, () => {
      client.write(standardHeaderClient(uri));
    });
  }
}



client.setEncoding('utf8');

function standardHeaderClient (uri){
  var method, host, accept, date, userAgent;
  method = "GET / HTTP/1.1\r\n";
  host = "Host: " + uri + "\r\n";
  accept = "Accept: text/html, text/css, application/json\r\n";
  date = new Date().toUTCString();
  userAgent = "User-Agent: meee\r\n\r\n";
  header = method + host + accept + "Date: " + date + "\r\n" + userAgent;
return header;
}



client.on('data', (data) => {
  process.stdout.write(data);
});



client.on('close', () =>{
  console.log('Connection closed');
});






