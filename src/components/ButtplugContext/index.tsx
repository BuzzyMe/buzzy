import { ButtplugClient, ButtplugClientDevice } from 'buttplug';
import { createContext } from 'react';
import { ButtplugProvider } from './Provider';

interface ButtplugContextState {
    client?: ButtplugClient,
    initialized: boolean,
    devices: ButtplugClientDevice[]
}

const DefaultButtplugContext: ButtplugContextState = {
    initialized: false,
    devices: []
}

const ButtplugContext = createContext<ButtplugContextState>(DefaultButtplugContext);

export { ButtplugProvider, ButtplugContext, DefaultButtplugContext };
export type { ButtplugContextState };
