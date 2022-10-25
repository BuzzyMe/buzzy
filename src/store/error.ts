import create from "zustand";

interface Error {
    id: string;
    message: string;
}

interface ErrorState {
    errors: Error[],
    newError: (message: string) => void;
}

export const useErrorStore = create<ErrorState>((set, get) => ({
    errors: [],
    newError(message: string) {
        const errors = get().errors;
        const id = Date.now().toString();
        setTimeout(() => {
            set({errors: get().errors.filter(e => e.id !== id)});
        }, 1000)
        set({errors: [...errors, { id, message }]});
    },
}));