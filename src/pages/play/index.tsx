import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";

import { ButtplugDeviceMessageType } from "buttplug";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from 'styles/Slider.module.css';
import { PeerContext } from "components/PeerContext";
import { DataConnection } from "peerjs";
import useButtplugStore from "store/buttplug";

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
    const { initializePeer, peer } = useContext(PeerContext);

    useEffect(() => {
        const listeners: ((...a: any) => void)[] = [];
        const connections: DataConnection[] = [];
        const connection_list = (c: DataConnection) => { 
            connections.push(c);
            c.on("data", (d) => {
                console.log(d)
                c.send(JSON.parse(JSON.stringify(devices)))
            })
        }
        listeners.push(connection_list);
        peer?.on("connection", connection_list);
        return () => {
            for (const c of connections) {
                c.removeAllListeners();
            }
            peer?.removeListener("connection", connection_list);
        }
    }, [])
    const connect = () => {
        const conn = peer?.connect(connectToPeerId);
        conn?.on('open', () => {
            conn.send(devices)
        })
        conn?.on('data', (d: any) => {
            console.log("help")
            setDevices([...devices, d])
            console.log(d)
        })
    }
    
    return (
        <div className="auto-limit-w pt-20 space-y-3">
            {
                devices.map((d) => (
                    <div className="card space-y-3" key={d.Index}>
                        <h1>
                           {d.Name} 
                        </h1>
                        <div className="pb-2">
                            {
                                (() => {
                                    const vibrate_attributes = d.messageAttributes(ButtplugDeviceMessageType.VibrateCmd);
                                    return (
                                        vibrate_attributes && 
                                            <Slider onChange={(e) => d.vibrate(e as number / 100)} className={styles.slider} />
                                            
                                    )
                                })()                  
                            }
                        </div>
                        <div className="flex justify-end gap-3">
                            {
                                d.messageAttributes(ButtplugDeviceMessageType.StopDeviceCmd) && 
                                <button className="action" onClick={() => d.stop()}>Stop</button>
                            }
                        </div>
                    </div>
                ))
            }
            <div className="card space-y-3">
                <h1>Multiplayer</h1>
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
                        !peer ? <button className="action" onClick={initializePeer}>Enable Multiplayer</button> :
                        <button className="action" onClick={connect}>Connect</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Play;