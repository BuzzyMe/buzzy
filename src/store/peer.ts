import { DevicesPeerMessage, PeerDevicesMessage } from "modules/peer/data";
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
        const { devices } = useButtplugStore.getState();
        peer?.on("connection", (c) => {
            c.on("data", (d) => {
                PeerDevicesMessage(d as DevicesPeerMessage);
                c.send({ type: "devices", devices: JSONTools.strip(devices) } as DevicesPeerMessage)
            })
        })
        set(() => ({peer}));
        peer.on("open", () => set((state) => ({peer: state.peer})));
    }
}));

export default usePeerStore