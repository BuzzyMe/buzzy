import { ButtplugClient } from 'buttplug';
import { createContext } from 'react';
import { ButtplugProvider } from './Provider';

interface ButtplugContextState {
    client?: ButtplugClient,
    initialized: boolean
}

const DefaultButtplugContext: ButtplugContextState = {
    initialized: false
}

const ButtplugContext = createContext<ButtplugContextState>(DefaultButtplugContext);

export { ButtplugProvider, ButtplugContext, DefaultButtplugContext };
export type { ButtplugContextState };
