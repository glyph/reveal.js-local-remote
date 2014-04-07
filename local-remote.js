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
            Reveal.addEventListener('slidechanged', function (event) {
                var notes = event.currentSlide.querySelector(".notes");
                var notesText;
                if (notes === null) {
                    console.log("No notes for this slide.");
                    notesText = "(No notes for this slide.)";
                } else {
                    notesText = notes.innerHTML;
                }
                var notesCommand = JSON.stringify(
                    {command: "NOTES",
                     notes: notesText}
                );
                sock.send(notesCommand + "\r\n");
            });
            sock.onmessage = function (e) {
                var message = JSON.parse(e.data);
                switch (message.command) {
                    case "LEFT":
                        Reveal.left();
                        break;
                    case "RIGHT":
                        Reveal.right();
                        break;
                    case "UP":
                        Reveal.up();
                        break;
                    case "DOWN":
                        Reveal.down();
                        break;
                    case "NEXT":
                        Reveal.next();
                        break;
                    case "PAUSE":
                        Reveal.togglePause();
                        break;
                }
            };
        }
    }
})(window);
