/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import { getDevicePtr, OnPeerDevicesMessage } from "./device";
import { PeerMessage } from "./message";

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