import { DataConnection, MediaConnection } from "peerjs";

export const MapTools = {
    replacer: (key: string, value: unknown) => {
        if(value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
        } else {
            return value;
        }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviver: (key: string, value: any) => {
        if(typeof value === 'object' && value !== null) {
            if (value.dataType === 'Map') {
                return new Map(value.value);
            }
        }
        return value;
    }
}

export const JSONTools = {
    strip: <T,>(i: T) => {
        return JSON.parse(JSON.stringify(i, MapTools.replacer)) as T;
    },
    unstrip: <T,>(i: T) => {
        return JSON.parse(JSON.stringify(i), MapTools.reviver) as T;
    }
}

export const PeerTools = {
    isDataConnection(c: any): c is DataConnection {
        return typeof c.send === "function";
    }
}