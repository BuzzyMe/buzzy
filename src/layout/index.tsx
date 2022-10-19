import { FC } from "react";

interface MainLayoutProps {
    children: React.ReactNode,
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
}
export default MainLayout;