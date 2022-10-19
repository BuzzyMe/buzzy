import { FC, useEffect, useState } from "react";
import { DefaultPeerContext, PeerContext } from ".";

interface PeerProviderProps {
    children: React.ReactNode
}

export const PeerProvider: FC<PeerProviderProps> = (props) => {
    const [state, setState] = useState({...DefaultPeerContext});

    useEffect(() => {
        (async () => {
            const { Peer } = await import('peerjs');
            const initializePeer = () => {
                if (state.peer) return;
                const peer = new Peer();
                peer.on("open", () => setState({ initializePeer, peer }))
                peer.on("connection", () => setState({ initializePeer, peer }))
                setState({
                    peer,
                    initializePeer
                });
            }

            setState({
                initializePeer
            })
        })();
    }, []);
    return (
        <PeerContext.Provider value={state}>
            {props.children}
        </PeerContext.Provider>
    )
}

// export class PeerProvider extends Component<PeerProviderProps, PeerContextState> {
//     constructor(props: PeerProviderProps) {
//         super(props)
//         this.state = {...DefaultPeerContext};
        
//     }
//     async componentDidMount() {
//         const { Peer } = await import('peerjs');
        
//         const initializePeer = () => {
//             if (this.state.peer) return;
//             const peer = new Peer();
//             peer.on("open", () => this.setState({ peer }))
//             peer.on("close", () => this.setState({ peer }))
//             peer.on("connection", () => this.setState({ peer }));
//             this.setState({
//                 peer
//             });
//         }

//         this.setState({
//             initializePeer
//         })
//     }
//     render(): ReactNode {
//         return (
//             <PeerContext.Provider value={this.state}>
//                 {this.props.children}
//             </PeerContext.Provider>
//         )
//     }
// }