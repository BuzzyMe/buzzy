import { ButtplugClientDevice, ButtplugDeviceMessageType } from "buttplug"
import { PeerDevice } from "modules/multiplayer/peer/device"
import { FC } from "react"
import BasicController from "./Controller/Basic"

interface DeviceProps {
    device: ButtplugClientDevice | PeerDevice
}

const DevicePanel: FC<DeviceProps> = ({ device: d }) => {
    return (
        <div className="card space-y-3" key={d.Index}>
            <h1>
                {d.Name} {d instanceof PeerDevice ? "(Online)" : ""}
            </h1>
                <BasicController device={d} />
            <div className="action-container">
                {
                    d.messageAttributes(ButtplugDeviceMessageType.StopDeviceCmd) && 
                    <button className="action" onClick={() => d.stop()}>Stop</button>
                }
            </div>
        </div>
    )
}

export default DevicePanel;