import { FC, useEffect } from "react";
import useButtplugStore from "store/buttplug";

interface ButtplugLayoutProps {
    children: React.ReactNode,
}

const ButtplugLayout: FC<ButtplugLayoutProps> = ({ children }) => {
    const { newClientIfUndefined, client } = useButtplugStore();
    useEffect(() => {
        (async () => {
            if (!client) {
                await newClientIfUndefined();
            }
        })();
    }, []);

    return (
        <>
            {children}
        </>
    );
}
export default ButtplugLayout;