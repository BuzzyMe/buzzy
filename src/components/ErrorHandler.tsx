import { FC } from "react";
import { useErrorStore } from "store/error";

const ErrorHandler: FC = () => {
    const { errors } = useErrorStore();

    return (
        <div className="fixed bottom-0 right-0 w-full sm:w-fit p-3 space-y-3">
            {
                errors.map(e => (
                    <div className="card border-error" key={e.id}>
                        <h1>{e.error.name}</h1>
                        {e.error.message}
                    </div>
                ))
            }
        </div>
    )
}

export default ErrorHandler;