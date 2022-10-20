import { getDevicePtr, OnPeerDevicesMessage } from "modules/peer/device";
import { handler } from "modules/peer/handler";
import { PeerDevicesMessage, PeerMessage } from "modules/peer/message";
import { JSONTools } from "modules/peer/tools";
import Peer, { Peer as TPeer } from "peerjs";
import create from "zustand";
import useButtplugStore from "./buttplug";

export interface PeerStoreState {
    peer?: TPeer,
    newPeerIfUndefined: () => Promise<TPeer | undefined>
}

const usePeerStore = create<PeerStoreState>((set, get) => ({
    peer: undefined,
    newPeerIfUndefined: async () => {
        if (get().peer) return get().peer;
        const { Peer } = await import('peerjs');
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
        })
        peer.on("open", () => set((state) => ({peer: state.peer})));
        set(() => ({peer}));
        return get().peer;
    }
}));

export default usePeerStore