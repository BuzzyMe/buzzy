import { NextPage } from "next";

import useButtplugStore from "store/buttplug";
import usePeerStore from "store/peer";
import { useEffect, useState } from "react";
import { JSONTools } from "modules/peer/tools";
import BasicController from "components/Play/Controller/Basic";
import { PeerDevicesMessage, PeerMessage } from "modules/peer/message";
import { getDevicePtr, OnPeerDevicesMessage } from "modules/peer/data";
import { useRouter } from "next/router";
import MultiplayerController from "components/Play/MultiplayerController";

const Play: NextPage = () => {

    const { devices, client, newClientIfUndefined } = useButtplugStore();

    const router = useRouter();
    const propConnectId = typeof router.query.id === "object" ? router.query.id[0] : undefined;

    useEffect(() => {
        (async () => {
            if (!client) {
                await newClientIfUndefined();
            }
        })();
    }, []);

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

export default Play;