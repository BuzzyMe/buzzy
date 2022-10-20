import { NextPageWithLayout } from "next";

import useButtplugStore from "store/buttplug";
import BasicController from "components/Play/Controller/Basic";
import { useRouter } from "next/router";
import MultiplayerController from "components/Play/MultiplayerController";
import MainLayout from "layout";
import ButtplugLayout from "layout/buttplug";

const Play: NextPageWithLayout = () => {

    const { devices } = useButtplugStore();

    const router = useRouter();
    const propConnectId = typeof router.query.id === "object" ? router.query.id[0] : undefined;

    return (
        <div className="auto-limit-w pt-20 space-y-3">
            {
                devices.length ? devices.map((d) => (
                    <BasicController key={d.Index} device={d} />
                )) :
                <div className="card space-y-3">
                    <h1>No Devices Connected!</h1>
                    <div>
                        Either connect to a multiplayer session or click on settings to setup a local device...
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