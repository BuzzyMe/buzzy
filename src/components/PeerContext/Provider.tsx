import { Component, ReactNode } from "react";
import { DefaultPeerContext, PeerContext, PeerContextState } from ".";

interface PeerProviderProps {
    children: React.ReactNode
}

export class PeerProvider extends Component<PeerProviderProps, PeerContextState> {
    constructor(props: PeerProviderProps) {
        super(props)
        this.state = {...DefaultPeerContext};
    }
    async componentDidMount() {
        const { Peer } = await import('peerjs');
        
        const initializePeer = () => {
            if (this.state.peer) return;
            const peer = new Peer();
            peer.on("open", () => this.setState({ peer }))
            this.setState({
                peer
            });
        }

        this.setState({
            initializePeer
        })
    }
    render(): ReactNode {
        return (
            <PeerContext.Provider value={this.state}>
                {this.props.children}
            </PeerContext.Provider>
        )
    }
}