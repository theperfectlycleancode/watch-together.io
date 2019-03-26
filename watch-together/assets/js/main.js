const remote = require('electron').remote;


const server = null;
const client = null;

var socket = io('http://localhost:3000');

var hId = null;

$(document).ready(function() {
  $('.winButtonClose-1HsbF-').on('click', function() {
    var window = remote.getCurrentWindow();
    window.close();;
  });
  $('.winButtonMax').on('click', function() {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  });
  $('.winButtonMin').on('click', function() {
    var window = remote.getCurrentWindow();
    window.minimize();
  });

  $('.connect-button').on('click', function() {
    $('.home').css("display","none");
    $('.searching').css("display","block");
    $('.searchmsg').text('Connecting to room...');
    var id = $('.roomidbox').val();

    // noise guarantees that we connect to the server in a E2E encrypted stream
    client = noise.connect('{public key from above}')

    // client is a noise-peer stream instance
    client.write('hello server')

  });

  $('.create-button').on('click', function() {
    $('.home').css("display","none");
    $('.searching').css("display","block");
    $('.searchmsg').text('Creating room...');
    let r = Math.random().toString(36).substring(7);
    let uid = Math.random().toString(36).substring(7);




    var data = {
      roomid: r,
      owner: {
        id: uid,
        name: 'undefined',
      }
    }
    socket.emit('room:create', JSON.stringify(data));

    socket.on('room:create:callback', function(dataStr) {
      var data = JSON.parse(dataStr);
      if(data.roomid == r && data.operation == 'ADDROOM' && data.status == 'OK') {
        setTimeout(() => {
          $('.home').css("display","none");
          $('.searching').css("display","none");
          $('.room').css("display","block");
          $('.old-container-mount').css("display","none");


          $('.room-mount').css("display","flex");
        }, 2500);
      }
    });

  });
  const webview = document.querySelector('webview')
  webview.addEventListener('console-message', (e) => {
    if(e.message.includes('hooked-link')) {
      var str = e.message.split('|')[1];
      console.log(str);
      webview.loadURL(str);
    }
})
  webview.addEventListener('dom-ready', () => {
    console.log('test m8');


webview.openDevTools();

/*webview.executeJavaScript('  var stream = document.getElementsByTagName("video"); console.log("hooked-link|"+stream[0].baseURI); alert(stream[0].baseURI);',false, function() {
  console.log('test2');
});*/
})
  $('.testvidin').on('click', function() {
    webview.executeJavaScript('function getSInfo() { var stream3 = document.getElementsByTagName("video"); for(var i = 0; i < stream3.length; i++) { if(typeof stream3[i].src !== "undefined") { console.log("hooked-link|"+stream3[i].src); } } } getSInfo();')
  });
});
