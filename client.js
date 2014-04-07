

window.onload = function () {

    var start;
    var longTouchTimeout;
    var touchWasPause;


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

    var broadcastObject = function(object) {
        sock.send(JSON.stringify(object) + "\r\n");
    };

    document.body.addEventListener('touchstart', function(event) {
        // event.preventDefault();
        var touch = event.targetTouches[0];
        start = {x: touch.pageX, y: touch.pageY};
        touchWasPause = false;
        longTouchTimeout = window.setTimeout(function () {
            broadcastObject({command: "PAUSE"});
            touchWasPause = true;
        }, 1500);
        sock.send("START X " + start.x + " Y " + start.y + "\r\n");
        return false;
    }, false);

    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
        return false;
    }, false);


    document.body.addEventListener('touchend', function(event) {
        // event.preventDefault();
        if (touchWasPause) {
            return;
        }
        window.clearTimeout(longTouchTimeout);
        var touch = event.changedTouches[0];
        var xmoved = start.x - touch.pageX;
        var absx = Math.abs(xmoved);
        var ymoved = start.y - touch.pageY;
        var absy = Math.abs(ymoved);
        var MOVE_THRESHOLD = 10;
        broadcastObject({
            command: "END",
            xmoved: xmoved,
            ymoved: ymoved,
            startx: start.x,
            starty: start.y
        });
        var cmd;
        if ((absx < MOVE_THRESHOLD) && (absy < MOVE_THRESHOLD)) {
            cmd = {command: "NEXT"};
        } else {
            if (absx > absy) {
                if (xmoved > 0) {
                    cmd = {command: "RIGHT"};
                } else {
                    cmd = {command: "LEFT"};
                }
            } else {
                if (ymoved > 0) {
                    cmd = {command: "DOWN"};
                } else {
                    cmd = {command: "UP"};
                }
            }
        }
        broadcastObject(cmd);
        return false;
    }, false);

    document.body.addEventListener('click', function (event) {
        event.preventDefault();
        console.log("next");
        broadcastObject({command: "NEXT"});
        return false;
    }, false);

};
