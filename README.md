reveal.js-local-remote
======================

Reveal.js has support for remotes, but they all bounce off the cloud and are therefore troublesome in a network-congested conference wifi environment. This one can do everything on a local server running on your machine so you just need your own local AP to work.  Also, displays presenter notes.

Using
=====

The way I do my presentations is just to edit index.html in a checkout of the reveal.js repository itself.

Assuming you do the same thing, you can get set up like this:

```
$ cd reveal.js
$ git clone https://github.com/sockjs/sockjs-client -b v0.3.4
$ git clone https://github.com/glyph/reveal.js-local-remote plugin/local-remote
```

Then add this:

```
{ src: 'sockjs-client/sockjs.js', async: true },
{ src: 'plugin/local-remote/local-remote.js', async: true }
```

to your dependencies list in your call to `Reveal.initialize`.

Finally, make sure you've got txsockjs installed and then:

```
twistd -n web --path . --port 8080
```

Connect to http://your-laptop.local:8080/plugin/local-remote/ from your iOS device and http://localhost:8080/ from your presentation browser.
