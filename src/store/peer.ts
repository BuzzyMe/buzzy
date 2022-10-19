import { Peer as TPeer } from "peerjs";
import create from "zustand";

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
        set(() => ({peer}));
        peer.on("open", () => set((state) => ({peer: state.peer})));
    }
}));

export default usePeerStore