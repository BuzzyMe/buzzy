import { getDevicePtr, OnPeerDevicesMessage } from "modules/peer/data";
import { PeerDevicesMessage, PeerMessage } from "modules/peer/message";
import { JSONTools } from "modules/peer/tools";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";

const MultiplayerController: FC = () => {
    const { peer, newPeerIfUndefined } = usePeerStore();
    const { devices } = useButtplugStore();
    
    const router = useRouter();
    const propConnectId = typeof router.query.id === "object" ? router.query.id[0] : undefined;

    const [connectToPeerId, setConnectToPeerId] = useState(propConnectId ?? "");

    const connect = () => {
        const conn = peer?.connect(connectToPeerId);
        conn?.on('open', () => {
            conn.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
        })
        conn?.on('data', (data) => {
            const d = data as PeerMessage;
            if (d.type === "devices") {
                OnPeerDevicesMessage(d, conn);
                return;
            }
            if (d.type === "method") {
                const device_index = devices.findIndex(e => getDevicePtr(e) === d.devicePtr);
                if (device_index !== -1) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const args: unknown[] = (d as any).params || [];
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (devices[device_index] as any)[d.method](...args);
                }
                return;
            }
        })
    }
    
    return (
        <div className="card space-y-3">
            <h1>Multiplayer (WIP!)</h1>
            <div className="space-y-3">
            Make sure to connect all your devices first before inviting someone! <br />
            {
                peer && (
                    <>
                        Your ID: <pre className="inline">{peer.id ?? "Loading..."}</pre>
                        <input className="input w-full" placeholder="Enter ID to Connect to" type="text" value={connectToPeerId} onChange={e => setConnectToPeerId(e.target.value)} />
                    </>
                )                    
            }
            </div>
            <div className="flex justify-end gap-3">
                {
                    !peer ? <button className="action" onClick={newPeerIfUndefined}>Enable Multiplayer</button> :
                    <button className="action" onClick={connect}>Connect</button>
                }
            </div>
        </div>
    );
}
export default MultiplayerController