window.onload = function () {

    var start;
    var longTouchTimeout;
    var touchWasPause;

    document.body.addEventListener('touchstart', function(event) {
        // event.preventDefault();
        var touch = event.targetTouches[0];
        start = {x: touch.pageX, y: touch.pageY};
        touchWasPause = false;
        longTouchTimeout = window.setTimeout(function () {
            LocalRemote.broadcastObject({command: "PAUSE"});
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
        LocalRemote.broadcastObject({
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
        LocalRemote.broadcastObject(cmd);
        return false;
    }, false);

    document.body.addEventListener('click', function (event) {
        event.preventDefault();
        console.log("next");
        LocalRemote.broadcastObject({command: "NEXT"});
        return false;
    }, false);

};
