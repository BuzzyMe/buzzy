import { ButtplugClient, ButtplugClientDevice, buttplugInit } from "buttplug";
import { PeerDevice } from "modules/multiplayer/peer/device";
import create from "zustand";

interface ButtplugState {
    client?: ButtplugClient,
    newClientIfUndefined: () => Promise<ButtplugClient | undefined>;
    initialized: boolean,
    devices: (ButtplugClientDevice | PeerDevice)[],
    setDevices: (devices: ButtplugClientDevice[]) => void;
}

const useButtplugStore = create<ButtplugState>((set, get) => ({
    client: undefined,
    newClientIfUndefined: async () => {
        const get_client = get().client;
        if (get_client) return get_client;
        await buttplugInit();
        get_client ?? set((state) => {
            const client = new ButtplugClient("buzzy");
            client.on("deviceadded", (e) => {
                set((state) => ({...state, devices: [...state.devices, e]}))
            })
            client.on("deviceremoved", (e) => {
                set((state) => ({...state, devices: [...state.devices].filter((d) => d.Index !== e.Index)}));
            })
            return {...state, client, initialized: true};
        })
        return get().client;
    },
    initialized: false,
    devices: [],
    setDevices: (devices) => set((state) => ({...state, devices}))
}));

export default useButtplugStore;
