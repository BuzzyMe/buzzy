import { ButtplugClient, ButtplugClientDevice } from 'buttplug';
import { createContext } from 'react';
import { ButtplugProvider } from './Provider';

interface ButtplugContextState {
    client?: ButtplugClient,
    initialized: boolean,
    devices: ButtplugClientDevice[],
    setDevices: (devices: ButtplugClientDevice[]) => void
}

const DefaultButtplugContext: ButtplugContextState = {
    initialized: false,
    devices: [],
    setDevices() {
        return;
    },
}

const ButtplugContext = createContext<ButtplugContextState>(DefaultButtplugContext);

export { ButtplugProvider, ButtplugContext, DefaultButtplugContext };
export type { ButtplugContextState };
