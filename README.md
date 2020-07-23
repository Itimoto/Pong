# Pong! And Its Many Implementations
A fairly simple, online two-player game of Pong.

---

<a href="https://famine.potato.irish/pong" target="_blank">
  <img src="https://raw.githubusercontent.com/Itimoto/Potato.Irish-Server/master/public/images/png/pong-prev.png" 
  alt="A Live Example of Pong" />
</a>

> Currently running over on [potato.irish](https://famine.potato.irish/pong)

## How to *Pong* (If you're here for the Fun)
### Q: What does the stuff on the Start Manu mean?
__A:__
> `PlayerX: Queueing` -- I couldn't pair you up with someone at the moment. You'll need to wait until someone else joins in.
> `PlayerX: Waiting` -- I got you a partner, and they may/may-not-have hit the 'Ready' button yet. Even if you hit 'Ready', you're not guaranteed that the Other Player has hit 'Ready' already. Alrighty?
> `PlayerX: You` -- You are PlayerX. This'll give you a hint on ***where*** you are on the gamescreen.
> `Button: Ready` -- For our purposes here, it 'lets the server know you're ready'. It doesn't, really, on the backend. It's deceptive, like the price of post-secondary education. But it's something. I'm very tired.
### Q: How do you play?
__A:__ You're in one of two camps: *Mobile* or *Desktop*. This stuff's detailed in the in-game Help menu, but I'll still list it here:
> **Desktop**: Use the arrow keys to move your Paddle Up/Down
> **Mobile**: Tap the Left/Right sides of the screen to move your Paddle Left/Right. If you rotated your phone Landscape, you'll tap the Top/Bottom to move your Paddle Up/Down.

Then, there's scoring: First to 9 Points wins.
That should be about it.
### Q: Pong quit on me, for some reason. Why'd you screw me over?
__A__: I didn't. If your Menu went Green, or if you were mid-game, it means that someone *left your game*. They closed the window, or they moved up a spot in the Roomba Roamer, *which you should check out, by the way*
Otherwise, I screwed up. For that I do dearly apologize.

### Q: How's it work?
__A__: I'll try to write a more in-depth explanation later on, but here's the general idea:
> `1` The client (*you*) opens this window. Then, your window tries to connect to `famine.potato.irish` through a Websocket (like a port for information; it's specialized for low-latency two-way communication)
> `2` As soon as it's connected, your window launches Pong -- which, upon startup, `requests Pong` from the Server.
> `3` When the server notices the `request`, it puts you in line with the rest of the lot. Once there are at least *two* clients in line, it pairs you up and notifies you.
> **This is what happens to make your window text go Green**
> `4` Then, when you hit `Start`, two things happen: 1) You tell the Server that you're ready. 2) You tell the Server the dimensions of your screen.
> `5` The Server comes up with an Aspect Ratio that fits both *your screen* and your *partner's*, then starts simulating the game, serverside.
> `6` At this point, the Server sends a copy of the Game's State to both of you *every 30ms*, and listens for your keyboard/screen input to update it accordingly.

---

## How to Implement Online Multiplayer (If you're here for the *real* Fun)
First, you'll need your prerequisites:
- Node.js, NPM, and Git need to be installed locally
- A distinct lack of fear of a Command Line
- (No SSL Certificates Necessary!)

If you'd like to deploy it to a Server/VPS, you'll have a little more to do. I've written up a [Fairly-Brief guide](https://github.com/Itimoto/Potato.Irish-Server#hol-up-what-if-you-screwed-up-along-the-way-and-needed-to-reset-potatoirish-from-scratch) on the full [Potato.Irish Server Repository](https://github.com/Itimoto/Potato.Irish-Server); that ought to get you started.

Got it? Great.

Clone into the Repository from the location of your choice.
```
$ git clone https://github.com/Itimoto/Pong
```
Install the Dependencies.
```
$ cd Pong
$ npm install
```
Run the Multiplayer Example Server.
```
$ node multiplayer-server.js
```
> *You'll need to use sudo on Unix-based OSs due to security reasons. This is not recommended, but will function for a demo*

...

*"But wait!"*, you might ask, *"What if I want to incorporate it into an existing project?"*

I merged Pong with the [Roomba-Roamer](https://github.com/Itimoto/Roomba-Roamer) over at [Potato.Irish](https://github.com/Itimoto/Potato.Irish-Server). The directory structure there is similar to what's visible here, albeit with some slight tweaks.

See, Pong is accessible through *both* the 'dedicated pong process' (`lib/pong/_pong-server.js`) *and* through the Roomba-Roamer process (`lib/rr/_rr-server.js`) due to a common entrypoint: `lib/pong/client-manager.js`, which can cue Pong-ready Clients into the shared Pong queue through the `pongRequested()` method — which both `_rr-server` and `_pong-server` use. Nice!

---

## How to Implement Local Multiplayer
Two options: 
1. Follow the same steps above, running `$ node local-game-server.js`
2. Open the file `literally just pong.html` in Chrome/Firefox/Edge/etc.

---

## Commentary
Originally written as an extension of the Roomba Roamer, the standalone-game is a semi-featured Online Multiplayer game of Pong.
I figured I'd make the game a bit more... modular. I wrote it almost like a Package, but not *quite*. It's still fairly simple to implement into other projects, and, well, fairly fun, no?

#### Challenges
- The web-infrastructure was the easy part -- I already had a server, websockets, etc. set up from the Roomba Roamer. All that was really left was to *build* it. And... well...
- *Latency* was the primary issue. Or, really, the fact that the Net's pretty inconsistent. That's were Frame-Interpolation came in play, smoothing everything out, as well as streamlining server-sent Game Updates.
- Other issues included:
  - Cross-Platform Support. 
    - Pong's able to adapt to different screens, allowing windows with more narrow aspect ratios to play fairly-normally with the wide, and Phones with Desktops.
  - Modular Infrastructure

---

## Credit Where Credit Is Due
Though Pong was made *(virtually)* from scratch, a good chunk of inspiration came from __[@Victor Zhou's](https://github.com/vzhou842)__ [*How to Build a (.io) Web Game* Series](https://victorzhou.com/blog/build-an-io-game-part-1/). In particular, the section on [frame interpolation](https://victorzhou.com/blog/build-an-io-game-part-1/#7-client-state)