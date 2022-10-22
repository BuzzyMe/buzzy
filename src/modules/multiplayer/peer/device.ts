/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtplugClientDevice, ButtplugMessageSorter } from "buttplug";
import { Buttplug } from "buttplug/dist/module/buttplug_ffi";
import { DataConnection } from "peerjs";
import usePeerStore from "store/peer";
import { PeerCmdMessage } from "./message";

export class PeerDevice extends ButtplugClientDevice {
    ota = true;
    connectionId?: string;
    peerId?: string;

    async vibrate(...a: any): Promise<void> {
        this.sendCommand("vibrate", a);
    }
    async rotate(...a: any): Promise<void> {
        this.sendCommand("rotate", a);
    }
    async linear(...a: any): Promise<void> {
        this.sendCommand("linear", a);
    }
    batteryLevel(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    rssiLevel(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    rawRead(endpoint: Buttplug.Endpoint, expectedLength: number, timeout: number): Promise<Uint8Array> {
        throw new Error("Method not implemented.");
    }
    async rawWrite(...a: any): Promise<void> {
        this.sendCommand("rawWrite", a);
    }
    rawSubscribe(endpoint: Buttplug.Endpoint): Promise<void> {
        throw new Error("Method not implemented.");
    }
    rawUnsubscribe(endpoint: Buttplug.Endpoint): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async stop(): Promise<void> {
        this.sendCommand("stop");
    }

    sendCommand(method: string, params?: any[]) {
        const message = { type: "method", method: method, devicePtr: getDevicePtr(this) } as PeerCmdMessage;
        if (params) message.params = params;
        const { peer } = usePeerStore.getState();
        if (this.peerId && this.connectionId && peer) {
            (peer.getConnection(this.peerId, this.connectionId) as DataConnection).send(message)
        }
    }
    static fromJSON(i: any) {
        const input = {...i};
        const _sorter = new ButtplugMessageSorter();
        Object.assign(_sorter, input._sorter)
        const e = new PeerDevice(
            i._devicePtr, 
            _sorter,
            i._index,
            i._name,
            []
        );
        delete input["_sorter"]
        Object.assign(e, input)
        return e;
    }
    static fromJSONWithConnection(i: any, connection: DataConnection) {
        const ret = PeerDevice.fromJSON(i);
        ret.connectionId = connection.connectionId;
        ret.peerId = connection.peer;
        return ret;
    }
}

export const getDevicePtr = (device: PeerDevice | ButtplugClientDevice) => {
    return (device as any)._devicePtr as number;
}

