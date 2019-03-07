const remote = require('electron').remote;

$(document).ready(function() {
  $('.AppClose').on('click', function() {
    var window = remote.getCurrentWindow();
    window.close();;
  });
  $('.AppMax').on('click', function() {
    var window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
      window.maximize();
    } else {
      window.unmaximize();
    }
  });
  $('.AppMin').on('click', function() {
    var window = remote.getCurrentWindow();
    window.minimize();
  });

  $('.connect-button').on('click', function() {
    $('.home').css("display","none");
    $('.searching').css("display","block");
    $('.searchmsg').text('Connecting to room...');
  });

  $('.create-button').on('click', function() {
    $('.home').css("display","none");
    $('.searching').css("display","block");
    $('.searchmsg').text('Creating room...');
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
