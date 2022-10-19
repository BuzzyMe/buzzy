import { ButtplugClientDevice } from "buttplug";
import { ButtplugContextState } from "components/ButtplugContext";
import { DataConnection } from "peerjs";

export interface PeerMessage {
    type: string
}
export interface DevicesPeerMessage extends PeerMessage {
    type: "devices",
    devices: ButtplugClientDevice[]
}

export const PeerDevicesMessageOnData = (c: DataConnection, context: ButtplugContextState, callback?: (d: DevicesPeerMessage) => void) => {
    c.on("data", (data) => {
        const d = data as DevicesPeerMessage;
        if (d.type === "devices") {
            context.setDevices(context.devices.concat(d.devices))
            console.log(context.devices)
        }
        if (callback) callback(d);
    })
}