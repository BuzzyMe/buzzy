import { createContext } from 'react';
import { Peer } from "peerjs";

interface PeerContextState {
    peer?: Peer,
    initializePeer: () => void
}

const DefaultPeerContext: PeerContextState = {
    initializePeer() {
        return;
    },
}

const PeerContext = createContext<PeerContextState>(DefaultPeerContext);

export { PeerContext, DefaultPeerContext };
export type { PeerContextState };
