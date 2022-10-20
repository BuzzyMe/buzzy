import { ButtplugClientDevice } from "buttplug"

export interface PeerDevicesMessage {
    type: "devices";
    devices: ButtplugClientDevice[];
}

export interface VibrateCmdMessage {
    type: "method";
    method: "vibrate";
    params: Parameters<typeof ButtplugClientDevice.prototype.vibrate>;
}
export interface RotateCmdMessage {
    type: "method";
    method: "rotate",
    params: Parameters<typeof ButtplugClientDevice.prototype.rotate>,
}
export interface LinearCmdMessage {
    type: "method";
    method: "linear",
    params: Parameters<typeof ButtplugClientDevice.prototype.linear>,
}
export interface BatteryLevelCmdMessage {
    type: "method";
    method: "batteryLevel",
}
export interface RssiLevelCmdMessage {
    type: "method";
    method: "rssiLevel",
}
export interface RawReadCmdMessage {
    type: "method";
    method: "rawRead",
    params: Parameters<typeof ButtplugClientDevice.prototype.rawRead>,
}
export interface StopCmdMessage {
    type: "method";
    method: "stop",
}
export type PeerCmdMessage = {
    type: "method";
    method: string;
} 
& VibrateCmdMessage
| RotateCmdMessage
| LinearCmdMessage
| BatteryLevelCmdMessage
| RssiLevelCmdMessage

export type PeerMessage = PeerDevicesMessage | PeerCmdMessage