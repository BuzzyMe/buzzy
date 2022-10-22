import Head from "next/head";
import { FC } from "react";
const PWAHead: FC = () => {
    return (
        <Head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#714fac" />
            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        </Head>
    )
}
export default PWAHead;