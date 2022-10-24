import { ButtplugClientDevice, ButtplugDeviceMessageType } from "buttplug"
import { PeerDevice } from "modules/multiplayer/peer/device"
import { FC, useState } from "react"
import BasicController from "./Controller/Basic"
import DrawController from "./Controller/Draw"

interface DeviceProps {
    device: ButtplugClientDevice | PeerDevice
}

enum ControllerType {
    Basic,
    Draw
}

const DevicePanel: FC<DeviceProps> = ({ device: d }) => {
    const [ controllerType, setControllerType ] = useState(ControllerType.Basic);
    return (
        <div className="card space-y-3" key={d.Index}>
            <h1>
                {d.Name} {d instanceof PeerDevice ? "(Online)" : ""}
            </h1>
                {
                    {
                        [ControllerType.Basic] : <BasicController device={d} />,
                        [ControllerType.Draw] : <DrawController device={d} />
                    }[controllerType]
                }
            <div className="action-container">
                <button className="action" onClick={() => setControllerType(Number(!Boolean(controllerType)))}>Toggle Mode</button>
                {
                    d.messageAttributes(ButtplugDeviceMessageType.StopDeviceCmd) && 
                    <button className="action" onClick={() => d.stop()}>Stop</button>
                }
            </div>
        </div>
    )
}

export default DevicePanel;