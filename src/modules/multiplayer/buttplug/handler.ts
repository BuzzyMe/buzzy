import { ButtplugClient, ButtplugClientDevice } from "buttplug";
import { DataConnection, MediaConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { PeerDevice } from "../peer/device";
import { PeerDevicesMessage } from "../peer/message";
import { JSONTools } from "../peer/tools";

const handler = async (client: ButtplugClient) => {
    
    const send_devices = (devices: (PeerDevice | ButtplugClientDevice)[]) => {
        const { peer } = usePeerStore.getState();
        const connections: (DataConnection | MediaConnection)[] | undefined = peer?.connections ? Object.values(peer?.connections).flatMap(e => e) : undefined;
        if (!connections) return;
        for (const c of connections) {
            if (c instanceof DataConnection) {
                c.send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
            }
        }
    }

    client.on("deviceadded", (d) => {
        const { devices } = useButtplugStore.getState();
        send_devices([d, ...devices])
    })
    client.on("deviceremoved", (d) => {
        const { devices } = useButtplugStore.getState();
        send_devices([...devices].filter((d) => d.Index !== d.Index));
    })
}

export default handler;