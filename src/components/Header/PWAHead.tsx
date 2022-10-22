import Head from "next/head";
import { FC } from "react";
const PWAHead: FC = () => {
    return (
        <Head>
            <link rel="manifest" href="/manifest.json" />
        </Head>
    )
}
export default PWAHead;