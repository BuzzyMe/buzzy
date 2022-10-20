import { NextPage } from "next";

import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { useEffect, useState } from "react";
import { JSONTools } from "modules/peer/tools";
import BasicController from "components/Play/BasicController";
import { PeerDevicesMessage, PeerMessage } from "modules/peer/message";
import { getDevicePtr, OnPeerDevicesMessage } from "modules/peer/data";

const Play: NextPage = () => {
    const { devices, client, newClientIfUndefined } = useButtplugStore();

    useEffect(() => {
        (async () => {
            if (!client) {
                await newClientIfUndefined();
            }
        })();
    }, []);

    const [connectToPeerId, setConnectToPeerId] = useState("");
    const {peer, newPeerIfUndefined} = usePeerStore();

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
        <div className="auto-limit-w pt-20 space-y-3">
            {
                devices.length ? devices.map((d) => (
                    <BasicController key={d.Index} device={d} />
                )) :
                <div className="card space-y-3">
                    <h1>No Devices Connected!</h1>
                    <div>
                        Either connect to a multiplayer session or click on settings to setup a local device...
                    </div>
                </div>
            }
            <div className="card space-y-3">
                <h1>Multiplayer (WIP!)</h1>
                {
                    peer && (
                        <div className="space-y-3">
                            Your ID: <pre className="inline">{peer.id ?? "Loading..."}</pre>
                            <input className="input w-full" placeholder="Enter ID to Connect to" type="text" value={connectToPeerId} onChange={e => setConnectToPeerId(e.target.value)} />
                        </div>
                    )                    
                }
                <div className="flex justify-end gap-3">
                    {
                        !peer ? <button className="action" onClick={newPeerIfUndefined}>Enable Multiplayer</button> :
                        <button className="action" onClick={connect}>Connect</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Play;