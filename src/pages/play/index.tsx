import { ButtplugContext } from "components/ButtplugContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { ButtplugDeviceMessageType } from "buttplug";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from 'styles/Slider.module.css';
import { PeerContext } from "components/PeerContext";

const Play: NextPage = () => {
    const { client, devices } = useContext(ButtplugContext);

    const { initializePeer, peer } = useContext(PeerContext);
    
    const router = useRouter();

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
                                    console.log(vibrate_attributes)
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
                        <div>
                            Your ID: <pre className="inline">{peer.id ?? "Loading..."}</pre>
                        </div>
                    )                    
                }
                <div className="flex justify-end gap-3">
                    {
                        !peer && <button className="action" onClick={initializePeer}>Enable Multiplayer</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Play;