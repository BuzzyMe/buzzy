import { NextPage, NextPageWithLayout } from "next";
import { useContext } from "react";
import { ButtplugContext, ButtplugProvider } from "components/ButtplugContext";
import dynamic from "next/dynamic";
import { ButtplugEmbeddedConnectorOptions } from "buttplug";
import Link from "next/link";

const Play: NextPageWithLayout = () => {
    return (
        <Link href="/play/settings">
            hi
        </Link>
    )
}

export default Play;