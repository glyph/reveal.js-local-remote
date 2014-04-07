reveal.js-local-remote
======================

Reveal.js has support for remotes, but they all bounce off the cloud and are therefore troublesome in a network-congested conference wifi environment. This one can do everything on a local server running on your machine so you just need your own local AP to work.  Also, displays presenter notes.

Using
=====

The way I do my presentations is just to edit index.html in a checkout of the reveal.js repository itself.

Assuming you do the same thing, you can get set up like this:

```bash
$ cd reveal.js
$ git clone https://github.com/sockjs/sockjs-client -b v0.3.4
$ git clone https://github.com/glyph/reveal.js-local-remote plugin/local-remote
```

Then add this:

```js
{ src: 'sockjs-client/sockjs.js', async: true },
{ src: 'plugin/local-remote/local-remote.js', async: true }
```

to your dependencies list in your call to `Reveal.initialize`.

Finally, set up your virtualenv however you like, then:

```bash
$ pip install -r requirements.txt
$ twistd -n web --path . --port 8080
```

## Touch control view
Connect to http://your-laptop.local:8080/plugin/local-remote/ from your iOS device and http://localhost:8080/ from your presentation browser.

In this view, taps trigger the next slide and swipes translate to left/right/up/down.

## Button view
Connect to http://your-laptop.local:8080/plugin/local-remote/buttons.html from your iOS device and http://localhost:8080/ from your presentation browser.

Touch control does not work in this view, but at the top of the page there are previous and next buttons.  When first connecting to the view, there is only a start button, which when pressed will begin the speaker note sync and display the previous/next buttons.

## Advice
Oh and for goodness sake *remember to press `f` on your presentation browser*, there is nothing more annoying than staring at the browser chrome at the top of the screen for an entire talk.
