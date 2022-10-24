/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { handler } from "modules/multiplayer/peer/handler";
import { PeerDevicesMessage, PeerMessage } from "modules/multiplayer/peer/message";
import { JSONTools } from "modules/multiplayer/peer/tools";
import { Peer as TPeer } from "peerjs";
import { env } from "env/client.mjs";
import create from "zustand";
import useButtplugStore from "./buttplug";

export interface PeerStoreState {
    peer?: TPeer,
    newPeerIfUndefined: () => TPeer | undefined
}
const getPeerConfig = () => {
    const config: ConstructorParameters<typeof TPeer>[1] = {};
    env.NEXT_PUBLIC_PEERJS_HOST?.length && (config.host = env.NEXT_PUBLIC_PEERJS_HOST);
    env.NEXT_PUBLIC_PEERJS_PORT?.length && (config.port = Number(env.NEXT_PUBLIC_PEERJS_PORT));
    env.NEXT_PUBLIC_PEERJS_PATH?.length && (config.path = env.NEXT_PUBLIC_PEERJS_PATH);
    return config;
}

const usePeerStore = create<PeerStoreState>((set, get) => {
    const refreshPeerState = () => set((state) => ({peer: state.peer}));

    return {
        peer: undefined,
        newPeerIfUndefined: () => {
            if (get().peer) return get().peer;
            
            const importedPeer: any = require('peerjs');
            const Peer: typeof TPeer = importedPeer.Peer;

            const peer = new Peer({...getPeerConfig()});
            peer?.on("connection", (c) => {
                c.on("data", (data) => {
                    const d = data as PeerMessage;
                    const { devices } = useButtplugStore.getState();
                    if (d.type === "devices") {
                        c.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
                    }
                })
                c.on("close", refreshPeerState);
                handler(c);

                refreshPeerState();
            })
            peer.on("open", refreshPeerState);
            set(() => ({peer}));
            return get().peer;
        }
    }
});

export default usePeerStore