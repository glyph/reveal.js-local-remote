/**
 * Touch-based remote controller for your presentation which does not require
 * global internet access; just Wi-Fi.
 */

(function(window){
    /**
     * Detects if we are dealing with a touch enabled device (with some false positives)
     * Borrowed from modernizr: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touch.js
     */
    var hasTouch  = (function(){
        return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
    })();

    /**
     * Detects if notes are enable and the current page is opened inside an /iframe
     * this prevents loading Remotes.io several times
     */
    var isNotesAndIframe = (function(){
        return window.RevealNotes && (self != top);
    })();

    if(!hasTouch && !isNotesAndIframe){
        if(!hasTouch && !isNotesAndIframe){


            var sock = new SockJS('/plugin/local-remote/client.rpy');
            sock.onopen = function () {
                console.log("Opened.");
            };
            var propagateNotes = function(event) {
                var notes;
                if (event) {
                  notes = event.currentSlide.querySelector(".notes");
                } else {
                  notes = Reveal.getCurrentSlide().querySelector(".notes");
                }

                var notesText;
                if (notes === null) {
                    console.log("No notes for this slide.");
                    notesText = "(No notes for this slide.)";
                } else {
                    notesText = notes.innerHTML;
                }
                sendMessage({command: "NOTES", notes: notesText});
            }
            var sendMessage = function(obj) {
                sock.send(JSON.stringify(obj) + "\r\n");
            }
            Reveal.addEventListener('slidechanged', propagateNotes);
            sock.onmessage = function (e) {
                var message = JSON.parse(e.data);
                switch (message.command) {
                    case "LEFT":
                        sendMessage({command: "ACK"});
                        Reveal.left();
                        break;
                    case "RIGHT":
                        sendMessage({command: "ACK"});
                        Reveal.right();
                        break;
                    case "UP":
                        sendMessage({command: "ACK"});
                        Reveal.up();
                        break;
                    case "DOWN":
                        sendMessage({command: "ACK"});
                        Reveal.down();
                        break;
                    case "NEXT":
                        sendMessage({command: "ACK"});
                        Reveal.next();
                        break;
                    case "PAUSE":
                        sendMessage({command: "ACK"});
                        Reveal.togglePause();
                        break;
                    case "PREV":
                        sendMessage({command: "ACK"});
                        Reveal.prev();
                        break;
                    case "START":
                        sendMessage({command: "ACK"});
                        propagateNotes();
                        break;
                }
            };
        }
    }
})(window);
