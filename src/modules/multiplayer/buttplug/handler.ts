import { ButtplugClient, ButtplugClientDevice } from "buttplug";
import { DataConnection, MediaConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { PeerDevice } from "../peer/device";
import { PeerDevicesMessage } from "../peer/message";
import { JSONTools, PeerTools } from "../peer/tools";



const multiplayer_buttplug_handler = async (client: ButtplugClient) => {
    const send_devices = (devices: (PeerDevice | ButtplugClientDevice)[]) => {
        console.log("resent devices", devices);
        const { peer } = usePeerStore.getState();
        const connections: (DataConnection | MediaConnection)[] | undefined = peer?.connections ? Object.values(peer?.connections).flatMap(e => e) : undefined;
        if (!connections) return;
        for (const c of connections) {
            if (PeerTools.isDataConnection(c)) {
                c.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage);
            }
        }
    }

    client?.on("deviceadded", (d) => {
        const { devices } = useButtplugStore.getState();
        send_devices([...devices])
    })
    client?.on("deviceremoved", (e) => {
        const { devices } = useButtplugStore.getState();
        send_devices([...devices].filter((d) => d.index !== e.Index));
    })
}

export default multiplayer_buttplug_handler;