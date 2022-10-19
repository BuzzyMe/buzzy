import { ButtplugContext } from "components/ButtplugContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const Play: NextPage = () => {
    const buttplugContext = useContext(ButtplugContext);
    const router = useRouter();

    useEffect(() => {
        if (!buttplugContext.client?.Connected) {
            router.push("/play/settings");
        }
    })
    return (
        <>hi</>
    )
}

export default Play;