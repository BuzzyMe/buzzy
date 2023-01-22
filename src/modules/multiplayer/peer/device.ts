/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtplugClientDevice, ButtplugMessage, ButtplugMessageSorter, MessageAttributes } from "buttplug";
import * as Messages from "buttplug/dist/main/src/core/Messages"
import { DataConnection } from "peerjs";
import usePeerStore from "store/peer";
import { PeerMessage } from "./message";
import { JSONTools } from "./tools";

export class PeerDevice extends ButtplugClientDevice {
    ota = true;
    connectionId?: string;
    peerId?: string;

    static fromJSONWithConnection(i: any, connection: DataConnection) {
        const ma = new MessageAttributes(i._deviceInfo.DeviceMessages);
        i._deviceInfo.DeviceMessages = ma;
        const e = new PeerDevice(i._deviceInfo, async (_device, msg) => {
            try {
                connection.send({ type: "msg", data: JSON.parse(msg.toJSON()) });
            }
            catch (e) {
                console.log(e);
                return new Messages.Error("bad");
            }
            return new Messages.Ok(msg.Id);
        });

        const ret = Object.assign(e, i);
        ret.connectionId = connection.connectionId;
        ret.peerId = connection.peer;
        return ret;
    }
}

export const getDevicePtr = (device: PeerDevice | ButtplugClientDevice) => {
    return (device as any)._devicePtr as number;
}

