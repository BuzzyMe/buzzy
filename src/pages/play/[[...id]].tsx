import { NextPageWithLayout } from "next";

import useButtplugStore from "store/buttplug";
import BasicController from "components/Play/Controller/Basic";
import { useRouter } from "next/router";
import MultiplayerController from "components/Play/MultiplayerController";
import MainLayout from "layout";
import ButtplugLayout from "layout/buttplug";
import Link from "next/link";
import DevicePanel from "components/Play/DevicePanel";

const Play: NextPageWithLayout = () => {

    const { devices } = useButtplugStore();

    const router = useRouter();
    const propConnectId = typeof router.query.id === "object" ? router.query.id[0] : undefined;

    return (
        <div className="auto-limit-w pt-20 space-y-3">
            {
                devices.length ? devices.map((d) => (
                    <DevicePanel key={d.index} device={d} />
                )) :
                <div className="card space-y-3">
                    <h1>No Devices Connected!</h1>
                    <div>
                        Either connect to a multiplayer session or click on <Link href="/play/settings"><a className="underline text-primary">settings</a></Link> to setup a local device...
                    </div>
                </div>
            }
            <MultiplayerController defaultId={propConnectId} />
        </div>
        
    )
}

Play.getLayout = (page) => {
    return (
        <MainLayout>
            <ButtplugLayout>
                {page}
            </ButtplugLayout>
        </MainLayout>
    )
};

export default Play;


