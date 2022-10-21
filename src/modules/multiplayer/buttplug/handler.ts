import { ButtplugClient, ButtplugClientDevice } from "buttplug";
import { DataConnection, MediaConnection } from "peerjs";
import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { PeerDevice } from "../peer/device";
import { PeerDevicesMessage } from "../peer/message";
import { JSONTools } from "../peer/tools";

const buttplug_handler = async (client: ButtplugClient) => {
    const send_devices = (devices: (PeerDevice | ButtplugClientDevice)[]) => {
        console.log("resent devices", devices);
        const { peer } = usePeerStore.getState();
        const connections: (DataConnection | MediaConnection)[] | undefined = peer?.connections ? Object.values(peer?.connections).flatMap(e => e) : undefined;
        if (!connections) return;
        for (const c of connections) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (typeof (c as any).send === "function") {
                (c as DataConnection).send({ type: "devices", devices: JSONTools.strip(devices) } as PeerDevicesMessage)
            }
        }
    }

    client?.on("deviceadded", () => {
        const { devices } = useButtplugStore.getState();
        send_devices([...devices])
    })
    client?.on("deviceremoved", (e) => {
        const { devices } = useButtplugStore.getState();
        send_devices([...devices].filter((d) => d.Index !== e.Index));
    })
}

export default buttplug_handler;