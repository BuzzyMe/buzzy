import { FC, useEffect, useState } from "react";

const ScrollHandler: FC = () => {

    const [_scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        document.documentElement.setAttribute("scroll", `${position}`);
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <></>
    )
}
export default ScrollHandler;