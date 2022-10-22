# Buzzy!

## About
Buzzy! is a Progressive Web App for controlling IoT adult toys across the internet (using WebRTC P2P) and locally (through Bluetooth and Intiface). It also uses the Buttplug-rs library for support across a wide range of device models.

## Privacy

The point of this project is to make a teledildonics application that respects your privacy, is open-source, convenient, and Peer-to-Peer that works both online and offline.

So this project uses WebRTC P2P connections for privacy and reduced latency. Is there any catch?

The only time that a server is contacted when using the controller, is your device requesting the page from the web server, and WebRTC using STUN and TURN servers to organize the handshake between you and the person you're connecting with. Then, all the traffic sent between you and the user(s) you've invited is Peer-to-Peer.

If it's Peer-to-Peer, then why's it built using a framework that includes a backend?

I've chosen to use Next.js as my framework of choice as:
1. It allows me to easily add features in the future that might require a server such as user generated content like patterns, friend lists, etc.
2. It offers a bunch of goodies like SSR for SEO, and a nice plugin for configuring generating the worker for PWA, easy project setup with Create-T3-App, etc. 
3. It simplifies Webpack configuration with React so I don't have to use something like CRACO with Create-React-App when using the Buttplug library.

## Deploying
Read [this](deploy-guide.md)...
