# Pong! And Its Many Implementations
A fairly simple, online two-player game of Pong.

---

<a href="https://famine.potato.irish/pong" target="_blank">
  <img src="https://raw.githubusercontent.com/Itimoto/Potato.Irish-Server/master/public/images/png/pong-prev.png" 
  alt="A Live Example of Pong" />
</a>

> Currently running over on [potato.irish](https://famine.potato.irish/pong)

---

## How to *Pong*
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