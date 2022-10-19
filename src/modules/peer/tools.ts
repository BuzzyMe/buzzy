export const MapTools = {
    replacer: (key: string, value: any) => {
        if(value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()), // or with spread: value: [...value]
            };
        } else {
            return value;
        }
    },
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