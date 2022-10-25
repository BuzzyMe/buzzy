import ErrorHandler from "components/ErrorHandler";
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
            <ErrorHandler />
        </>
    );
}
export default MainLayout;