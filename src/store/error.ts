import create from "zustand";

interface ErrorContainer {
    id: string;
    error: Error;
}

interface ErrorState {
    errors: ErrorContainer[],
    newError: (error: Error) => void
}

export const useErrorStore = create<ErrorState>((set, get) => ({
    errors: [],
    newError(error: Error) {
        const errors = get().errors;
        const id = Date.now().toString();
        setTimeout(() => {
            set({errors: get().errors.filter(e => e.id !== id)});
        }, 5000)
        set({errors: [...errors, { id, error }]});
    },
}));