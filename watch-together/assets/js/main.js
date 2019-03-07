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
});
