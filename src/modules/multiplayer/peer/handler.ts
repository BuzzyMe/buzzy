/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import { getDevicePtr, PeerDevice } from "./device";
import { PeerDevicesMessage, PeerMessage } from "./message";
import { JSONTools } from "./tools";

const OnPeerDevicesMessage = (data: PeerDevicesMessage, c: DataConnection) => {
    const {devices, setDevices} = useButtplugStore.getState();
    const devices_ptrs = devices.map(e => getDevicePtr(e));
    
    const new_devices = JSONTools.unstrip(data.devices);
    const filtered_new_devices = new_devices.filter(e => !devices_ptrs.includes(getDevicePtr(e)));
    const instantiated_new_devices = filtered_new_devices.map(e => PeerDevice.fromJSONWithConnection(e, c));

    setDevices([...devices, ...instantiated_new_devices]);
}

export const handler = (conn: DataConnection) => {
    conn.on('data', (data) => {
        const d = data as PeerMessage;
        if (d.type === "devices") {
            OnPeerDevicesMessage(d, conn);
            return;
        }
        if (d.type === "method") {
            const {devices} = useButtplugStore.getState();
            const device_index = devices.findIndex(e => getDevicePtr(e) === d.devicePtr);
            if (device_index !== -1) {
                const args: unknown[] = (d as any).params || [];
                (devices[device_index] as any)[d.method](...args);
            }
            return;
        }
    })
}