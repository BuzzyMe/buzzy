import { ButtplugClient, ButtplugClientDevice, buttplugInit } from "buttplug";
import create from "zustand";

interface ButtplugState {
    client?: ButtplugClient,
    newClientIfUndefined: () => Promise<void>;
    initialized: boolean,
    devices: ButtplugClientDevice[],
    setDevices: (devices: ButtplugClientDevice[]) => void;
}

const useButtplugStore = create<ButtplugState>((set, get) => ({
    client: undefined,
    newClientIfUndefined: async () => {
        await buttplugInit();
        get().client ?? set((state) => {
            const client = new ButtplugClient("buzzy");
            client.on("deviceadded", (e) => {
                set((state) => ({...state, devices: [...state.devices, e]}))
            })
            client.on("deviceremoved", (e) => {
                set((state) => ({...state, devices: [...state.devices].filter((d) => d.Index !== e.Index)}));
            })
            return {...state, client, initialized: true};
        })
    },
    initialized: false,
    devices: [],
    setDevices: (devices) => set((state) => ({...state, devices}))
}));

export default useButtplugStore;
