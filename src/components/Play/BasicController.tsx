import { ButtplugClientDevice, ButtplugDeviceMessageType } from "buttplug";
import Slider from "rc-slider";
import { FC, useState } from "react";
import styles from 'styles/Slider.module.css';
import 'rc-slider/assets/index.css';

interface BasicControllerProps {
    device: ButtplugClientDevice
}

const BasicController: FC<BasicControllerProps> = ({device: d}) => {
    const vibrate_attributes = d.messageAttributes(ButtplugDeviceMessageType.VibrateCmd);
    const [vibrateStates, setVibrateStates] = useState<number[]>(Array(Number(vibrate_attributes?.featureCount)).fill(0));
    
    return (
        <div className="card space-y-3" key={d.Index}>
            <h1>
                {d.Name} 
            </h1>
            <>
                { 
                    vibrateStates.map((e, i) => (
                        <div className="pb-2" key={i}>
                            <Slider value={e * 100} 
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
            <div className="flex justify-end gap-3">
                {
                    d.messageAttributes(ButtplugDeviceMessageType.StopDeviceCmd) && 
                    <button className="action" onClick={() => d.stop()}>Stop</button>
                }
            </div>
        </div>
    )
}

export default BasicController;