import { Peer as TPeer } from "peerjs";
import create from "zustand";
import useButtplugStore from "./buttplug";

export interface PeerStoreState {
    peer?: TPeer,
    newPeerIfUndefined: () => void
}

const usePeerStore = create<PeerStoreState>((set, get) => ({
    peer: undefined,
    newPeerIfUndefined: async () => {
        if (get().peer) return;
        const { Peer } = await import('peerjs');
        const peer = new Peer();
        const { devices } = useButtplugStore.getState();
        peer?.on("connection", (c) => {
            c.on("data", (d) => {
                console.log(d)
                c.send(JSON.parse(JSON.stringify(devices)))
            })
        })
        set(() => ({peer}));
        peer.on("open", () => set((state) => ({peer: state.peer})));
    }
}));

export default usePeerStore