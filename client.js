var LocalRemote = (function() {
    'use strict';

    var sock = new SockJS('/plugin/local-remote/client.rpy');

    sock.onopen = function() {
        console.log('open');
    };

    sock.onmessage = function(e) {
        console.log('message', e.data);
        var message = JSON.parse(e.data);
        console.log(message);
        if (message.command == 'NOTES') {
            document.getElementById("notes").innerHTML = message.notes;
        }
    };

    sock.onclose = function() {
        console.log('close');
    };

    return {
      broadcastObject: function(object) {
        sock.send(JSON.stringify(object) + "\r\n");
      }
    };
})();
