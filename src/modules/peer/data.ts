import { ButtplugClientDevice, ButtplugMessageSorter, MessageAttributes, RotationCmd, VectorCmd, VibrationCmd } from "buttplug";
import { Buttplug } from "buttplug/dist/module/buttplug_ffi";
import useButtplugStore from "store/buttplug";
import { JSONTools } from "./tools";

export class PeerDevice extends ButtplugClientDevice {
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
}

export interface DevicesPeerMessage {
    type: "devices",
    devices: ButtplugClientDevice[]
}
type PeerMessage = DevicesPeerMessage

export const PeerDevicesMessage = (data: PeerMessage) => {
    const {devices, setDevices} = useButtplugStore.getState();
    const new_devices = JSONTools.unstrip(data.devices);
    const new_devices_names = new_devices.map(e => e.Name);
    const instantiated_new_devices = new_devices.map(e => PeerDevice.fromJSON(e));
    const filtered_devices = devices.filter(e => !new_devices_names.includes(e.Name));
    console.log(new_devices)
    setDevices([...filtered_devices, ...instantiated_new_devices])
    // devices.findIndex(d)
}