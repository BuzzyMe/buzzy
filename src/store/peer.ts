import { OnPeerDevicesMessage } from "modules/peer/data";
import { PeerDevicesMessage } from "modules/peer/message";
import { JSONTools } from "modules/peer/tools";
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
        peer?.on("connection", (c) => {
            c.on("data", (d) => {
                OnPeerDevicesMessage(d as PeerDevicesMessage, c);
                const { devices } = useButtplugStore.getState();
                c.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
            })
        })
        set(() => ({peer}));
        peer.on("open", () => set((state) => ({peer: state.peer})));
    }
}));

export default usePeerStore