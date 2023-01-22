import { ButtplugClientDevice, ButtplugMessage } from "buttplug"

export interface PeerDevicesMessage {
    type: "devices";
    devices: ButtplugClientDevice[];
}

export interface PeerMsgMessage {
    type: "msg",
    data: Record<string, ButtplugMessage>;
}

export type PeerMessage = PeerDevicesMessage | PeerMsgMessage