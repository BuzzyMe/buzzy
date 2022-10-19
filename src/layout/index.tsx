import Header from "components/Header";
import { FC } from "react";

interface MainLayoutProps {
    children: React.ReactNode,
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
export default MainLayout;