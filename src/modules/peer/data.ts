import { ButtplugClientDevice, ButtplugMessageSorter, MessageAttributes, RotationCmd, VectorCmd, VibrationCmd } from "buttplug";
import { Buttplug } from "buttplug/dist/module/buttplug_ffi";
import { DataConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { PeerCmdMessage, PeerDevicesMessage } from "./message";
import { JSONTools } from "./tools";

export class PeerDevice extends ButtplugClientDevice {
    connection?: DataConnection;

    async vibrate(...a: any): Promise<void> {
        console.log(a)
        this.connection?.send({ type: "method", method: "vibrate", params: a } as PeerCmdMessage)
    }
    rotate(speeds: number | RotationCmd[], clockwise: boolean | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    linear(position: number | VectorCmd[], duration: number | undefined): Promise<void> {
        throw new Error("Method not implemented.");
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
    stop(): Promise<void> {
        throw new Error("Method not implemented.");
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

export const OnPeerDevicesMessage = (data: PeerDevicesMessage, c: DataConnection) => {
    const {devices, setDevices} = useButtplugStore.getState();
    const new_devices = JSONTools.unstrip(data.devices);
    const new_devices_names = new_devices.map(e => e.Name);
    const instantiated_new_devices = new_devices.map(e => PeerDevice.fromJSONWithConnection(e, c));
    const filtered_devices = devices.filter(e => !new_devices_names.includes(e.Name));
    console.log(new_devices)
    setDevices([...filtered_devices, ...instantiated_new_devices])
    // devices.findIndex(d)
}