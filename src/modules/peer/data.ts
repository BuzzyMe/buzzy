/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtplugClientDevice, ButtplugMessageSorter } from "buttplug";
import { Buttplug } from "buttplug/dist/module/buttplug_ffi";
import { DataConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import { PeerCmdMessage, PeerDevicesMessage } from "./message";
import { JSONTools } from "./tools";

export class PeerDevice extends ButtplugClientDevice {
    connection?: DataConnection;

    sendCommand(method: string, params?: any[]) {
        const message = { type: "method", method: method, devicePtr: getDevicePtr(this) } as PeerCmdMessage;
        if (params) message.params = params;
        this.connection?.send(message);
    }
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
    rawWrite(endpoint: Buttplug.Endpoint, data: Uint8Array, writeWithResponse: boolean): Promise<void> {
        throw new Error("Method not implemented.");
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
        ret.connection = connection;
        return ret;
    }
}

export const getDevicePtr = (device: PeerDevice | ButtplugClientDevice) => {
    return (device as any)._devicePtr as number;
}

export const OnPeerDevicesMessage = (data: PeerDevicesMessage, c: DataConnection) => {
    const {devices, setDevices} = useButtplugStore.getState();
    const devices_ptrs = devices.map(e => getDevicePtr(e));
    
    const new_devices = JSONTools.unstrip(data.devices);
    const filtered_new_devices = new_devices.filter(e => !devices_ptrs.includes(getDevicePtr(e)));
    const instantiated_new_devices = filtered_new_devices.map(e => PeerDevice.fromJSONWithConnection(e, c));

    setDevices([...devices, ...instantiated_new_devices])
    // devices.findIndex(d)
}

