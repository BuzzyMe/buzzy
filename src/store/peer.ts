/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { handler } from "modules/multiplayer/peer/handler";
import { PeerDevicesMessage, PeerMessage } from "modules/multiplayer/peer/message";
import { JSONTools } from "modules/multiplayer/peer/tools";
import { Peer as TPeer } from "peerjs";
import create from "zustand";
import useButtplugStore from "./buttplug";

export interface PeerStoreState {
    peer?: TPeer,
    newPeerIfUndefined: () => TPeer | undefined
}

const usePeerStore = create<PeerStoreState>((set, get) => {
    return {
    peer: undefined,
    newPeerIfUndefined: () => {
        if (get().peer) return get().peer;
        
        const importedPeer: any = require('peerjs');
        const Peer: typeof TPeer = importedPeer.Peer;

        const peer = new Peer();
        peer?.on("connection", (c) => {
            c.on("data", (data) => {
                const d = data as PeerMessage;
                const { devices } = useButtplugStore.getState();
                if (d.type === "devices") {
                    c.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
                }
            })
            handler(c);
            set((state) => ({peer: state.peer}));
        })
        peer.on("open", () => set((state) => ({peer: state.peer})));
        set(() => ({peer}));
        return get().peer;
    }
}
});

export default usePeerStore