import Head from "next/head";
import { FC } from "react";
const PWAHead: FC = () => {
    return (
        <Head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#714fac" />
        </Head>
    )
}
export default PWAHead;