import { ButtplugProvider } from "components/ButtplugContext";
import dynamic from "next/dynamic";
import { FC } from "react";

interface ButtplugLayoutProps {
    children: React.ReactNode,
}

const NoSSR = dynamic<ButtplugLayoutProps>(() => Promise.resolve(({children}) => {
    return (
        <>
            {children}
        </>
    )
}), { 
    ssr: false 
})

const ButtplugLayout: FC<ButtplugLayoutProps> = ({ children }) => {
    return (
        <ButtplugProvider>
            {children}
        </ButtplugProvider>
    );
}
export default ButtplugLayout;