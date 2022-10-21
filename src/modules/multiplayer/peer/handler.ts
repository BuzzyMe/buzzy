/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import { getDevicePtr, PeerDevice } from "./device";
import { PeerDevicesMessage, PeerMessage } from "./message";
import { JSONTools } from "./tools";

const OnPeerDevicesMessage = (data: PeerDevicesMessage, c: DataConnection) => {
    const {devices, setDevices} = useButtplugStore.getState();

    // get all peerdevices and buttplug client devices that are not owned by the person sending you their device list
    const omitted_ota_devices = devices.filter((e) => {
        if (e instanceof PeerDevice && e.peerId === c.peer) {
            
            return false
        }
        return true
    })

    // get all the pointers from this list
    const devices_ptrs = omitted_ota_devices.map(e => getDevicePtr(e));
    
    const new_devices = JSONTools.unstrip(data.devices);

    // filter out devices that might be correlating with local devices
    const filtered_new_devices = new_devices.filter(e => !devices_ptrs.includes(getDevicePtr(e)));
    const instantiated_new_devices = filtered_new_devices.map(e => PeerDevice.fromJSONWithConnection(e, c));

    setDevices([...omitted_ota_devices, ...instantiated_new_devices]);
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