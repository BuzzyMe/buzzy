import { ButtplugClient, ButtplugClientDevice, buttplugInit } from "buttplug";
import multiplayer_buttplug_handler from "modules/multiplayer/buttplug/handler";
import { PeerDevice } from "modules/multiplayer/peer/device";
import create from "zustand";

interface ButtplugState {
    client?: ButtplugClient,
    newClientIfUndefined: () => Promise<ButtplugClient | undefined>;
    connect: (...options: Parameters<typeof ButtplugClient.prototype.connect>) => Promise<void>,
    startScanning: () => Promise<void>,
    stopScanning: () => Promise<void>,

    devices: (ButtplugClientDevice | PeerDevice)[],
    setDevices: (devices: ButtplugClientDevice[]) => void;
}

const useButtplugStore = create<ButtplugState>((set, get) => ({
    client: undefined,
    newClientIfUndefined: async () => {
        let get_client = get().client;
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
            client.on("scanningfinished", () => set((state) => ({...state})));
            client.on("serverdisconnect", () => set((state) => ({...state})));
            return {...state, client};
        })
        get_client = get().client;
        get_client && multiplayer_buttplug_handler(get_client);
        return get_client;
    },
    connect: async (options) => {
        const c = get().client;
        return await c?.connect(options).then(() => set((state) => ({...state, client: c})));
    },
    startScanning: async () => {
        const c = get().client;
        return await c?.startScanning().then(() => set((state) => ({...state, client: c})))
    },
    stopScanning: async () => {
        const c = get().client;
        return await c?.stopScanning().then(() => set((state) => ({...state, client: c})))
    },

    devices: [],
    setDevices: (devices) => set((state) => ({...state, devices}))
}));

export default useButtplugStore;
