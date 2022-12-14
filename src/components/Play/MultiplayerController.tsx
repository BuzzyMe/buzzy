/* eslint-disable @typescript-eslint/no-explicit-any */
import { handler } from "modules/multiplayer/peer/handler";
import { PeerDevicesMessage } from "modules/multiplayer/peer/message";
import { JSONTools } from "modules/multiplayer/peer/tools";
import Peer, { DataConnection, MediaConnection } from "peerjs";
import { FC, useEffect, useState } from "react";
import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";

interface MultiplayerControllerProps {
    defaultId?: string
}

const MultiplayerController: FC<MultiplayerControllerProps> = ({ defaultId }) => {
    const { peer, newPeerIfUndefined } = usePeerStore();
    const { devices } = useButtplugStore();

    const [connectToPeerId, setConnectToPeerId] = useState("");

    const connect = (id: string, peerInstance?: Peer) => {
        const p = peerInstance ?? peer;
        const conn = p?.connect(id);
        
        conn?.on('open', () => {
            conn.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
        })
        conn && handler(conn);
    }

    const connections: (DataConnection | MediaConnection)[] | undefined = peer?.connections ? Object.values(peer?.connections).flatMap(e => e) : undefined;

    const disconnectAllConnections = () => {
        if (connections) {
            for (const c of connections) {
                c.close();
            }
        }
    }

    useEffect(() => {
        if (defaultId) {
            const p = newPeerIfUndefined();
            if (p) {
                p.once("open", () => {
                    setConnectToPeerId(defaultId);
                    connect(defaultId, p);  
                })
            }
        }
    }, [defaultId])
    
    return (
        <div className="card space-y-3">
            <h1>Multiplayer (WIP!)</h1>
            <div className="space-y-3">
            Invite or join a session! <br />
            {
                peer && (
                    <>
                        Your ID: <pre className="inline whitespace-pre-wrap break-words">{peer.id ?? "Loading..."}</pre>
                        <input className="input w-full" placeholder="Enter ID to Connect to" type="text" value={connectToPeerId} onChange={e => setConnectToPeerId(e.target.value)} />
                    </>
                )                    
            }
            </div>
            <div className="action-container">
                {
                    !peer ? <button className="action" onClick={newPeerIfUndefined}>Enable Multiplayer</button> :
                    <>
                        { peer.id && <button className="action" onClick={() => navigator.clipboard.writeText(window.location.origin + "/play/" + peer.id)}>Copy Invite URL</button>}
                        { !Boolean(connections?.length) ? 
                            <button className="action" onClick={() => connect(connectToPeerId)}>Connect</button>
                            : <button className="action" onClick={() => disconnectAllConnections()}>Disconnect</button>
                        }
                    </>
                }
            </div>
        </div>
    );
}
export default MultiplayerController