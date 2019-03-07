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
});
