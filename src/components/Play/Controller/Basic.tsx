import { ButtplugClientDevice, ButtplugDeviceMessageType, MessageAttributes, RotationCmd } from "buttplug";
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

    let rotate_attributes: MessageAttributes | undefined = undefined;
    try {
        rotate_attributes = d.messageAttributes(ButtplugDeviceMessageType.RotateCmd);
    }
    catch {}

    const [rotateStates, setRotateStates] = useState<number[]>(Array(Number(rotate_attributes?.featureCount)).fill(50));
    
    return (
        <>  
            {vibrateStates.length !== 0 && <h2>Vibrate</h2>}
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
            { rotate_attributes?.featureCount !== 0 }
            {
                Array(rotate_attributes?.featureCount).map((e, i) => {
                    <div className="pb-2" key={i}>
                        <Slider 
                            value={rotateStates[i]} 
                            step={100 / (rotate_attributes?.stepCount?.at(i) ?? 10)}
                            onChange={(v) => {
                                const move_value = (Number(v) - 50) / 100;
                                const clockwise = move_value < 0 ? false : true;
                                d.rotate([new RotationCmd(i, move_value, clockwise)], clockwise)
                                const newRotateStates = [...rotateStates];
                                newRotateStates[i] = v as number;
                                setRotateStates(newRotateStates);
                            }} 
                            onAfterChange={() => {
                                const newRotateStates = [...rotateStates];
                                newRotateStates[i] = 50;
                                setRotateStates(newRotateStates);
                            }}
                            className={styles.slider} 
                        />
                    </div>
                })
            }
        </>
    )
}

export default BasicController;