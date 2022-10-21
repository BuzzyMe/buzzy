import { ButtplugClientDevice, ButtplugDeviceMessageType } from "buttplug";
import Slider from "rc-slider";
import { FC, useState } from "react";
import styles from 'styles/Slider.module.css';
import 'rc-slider/assets/index.css';
import { PeerDevice } from "modules/multiplayer/peer/device";

interface BasicControllerProps {
    device: ButtplugClientDevice | PeerDevice
}

const BasicController: FC<BasicControllerProps> = ({device: d}) => {
    const vibrate_attributes = d.messageAttributes(ButtplugDeviceMessageType.VibrateCmd);
    const [vibrateStates, setVibrateStates] = useState<number[]>(Array(Number(vibrate_attributes?.featureCount)).fill(0));
    
    return (
        <div className="card space-y-3" key={d.Index}>
            <h1>
                {d.Name} {d instanceof PeerDevice ? "(Online)" : ""}
            </h1>
            <>
                { 
                    vibrateStates.map((e, i) => (
                        <div className="pb-2" key={i}>
                            <Slider 
                                value={e * 100} 
                                step={100 / (vibrate_attributes?.stepCount?.at(i) ?? 10)}
                                onChange={(v) => {
                                    const new_vib_states = [...vibrateStates];
                                    new_vib_states[i] = v as number / 100;
                                    d.vibrate(new_vib_states);
                                    setVibrateStates(new_vib_states);
                                }} 
                                className={styles.slider} 
                            />
                        </div>
                    ))
                }
            </>
            <div className="action-container">
                {
                    d.messageAttributes(ButtplugDeviceMessageType.StopDeviceCmd) && 
                    <button className="action" onClick={() => d.stop()}>Stop</button>
                }
            </div>
        </div>
    )
}

export default BasicController;