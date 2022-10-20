import { NextPage } from "next";

import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { useEffect, useState } from "react";
import { JSONTools } from "modules/peer/tools";
import { DevicesPeerMessage } from "modules/peer/data";
import BasicController from "components/Play/BasicController";

const Play: NextPage = () => {
    const { devices, client, newClientIfUndefined, setDevices } = useButtplugStore();

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
            conn.send({ type: "devices", devices: JSONTools.strip(devices) } as DevicesPeerMessage)
        })
        conn?.on('data', (d: any) => {
            console.log(d)
        })
    }
    
    return (
        <div className="auto-limit-w pt-20 space-y-3">
            {
                devices.map((d) => (
                    <BasicController key={d.Index} device={d} />
                ))
            }
            <div className="card space-y-3">
                <h1>Multiplayer (Not Working Yet!)</h1>
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