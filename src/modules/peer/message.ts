import { ButtplugClientDevice } from "buttplug"

export interface PeerDevicesMessage {
    type: "devices";
    devices: ButtplugClientDevice[];
}

interface VibrateCmdMessage {
    type: "method";
    method: "vibrate";
    params: Parameters<typeof ButtplugClientDevice.prototype.vibrate>;
}
interface RotateCmdMessage {
    type: "method";
    method: "rotate",
    params: Parameters<typeof ButtplugClientDevice.prototype.rotate>,
}
interface LinearCmdMessage {
    type: "method";
    method: "linear",
    params: Parameters<typeof ButtplugClientDevice.prototype.linear>,
}
interface BatteryLevelCmdMessage {
    type: "method";
    method: "batteryLevel",
}
interface RssiLevelCmdMessage {
    type: "method";
    method: "rssiLevel",
}
interface RawReadCmdMessage {
    type: "method";
    method: "rawRead",
    params: Parameters<typeof ButtplugClientDevice.prototype.rawRead>,
}
interface StopCmdMessage {
    type: "method";
    method: "stop",
}
export type PeerCmdMessage = {
    type: "method";
    method: string;
    params?: unknown[];
    devicePtr: number;
} 
& (
    VibrateCmdMessage
    | RotateCmdMessage
    | LinearCmdMessage
    | BatteryLevelCmdMessage
    | RssiLevelCmdMessage
    | RawReadCmdMessage
    | StopCmdMessage
)

export type PeerMessage = PeerDevicesMessage | PeerCmdMessage