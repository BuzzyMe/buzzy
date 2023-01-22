import { NextPageWithLayout } from "next";
import { useState } from "react";
import { ButtplugBrowserWebsocketClientConnector } from "buttplug";
import useButtplugStore from "store/buttplug";
import MainLayout from "layout";
import ButtplugLayout from "layout/buttplug";
import { PeerDevice } from "modules/multiplayer/peer/device";
import { useErrorStore } from "store/error";

const Settings: NextPageWithLayout = () => {
    const { devices, client, connect, startScanning, stopScanning } = useButtplugStore();

    const { newError } = useErrorStore();

    const [ moreSettings, setMoreSettings ] = useState(false);
    const [ serverUrl, setServerUrl ] = useState("ws://localhost:12345");

    const external_connect = async () => {
        if (!client?.connected) {
            try {
                const opts = new ButtplugBrowserWebsocketClientConnector(serverUrl);
                await connect(opts);
            }
            catch (e) {
                newError(e as Error)
            }
        }
        setMoreSettings(false);
    }

    // const embedded_connect = async () => {
    //     try {
    //         if (await !(navigator as any).bluetooth?.getAvailability()) throw new Error("WebBluetooth is not supported on this browser.");
    //         if (!client?.Connected) {
    //             await connect(new ButtplugEmbeddedConnectorOptions());
    //         }
    //         await startScanning();
    //     }
    //     catch (e) {
    //         newError(e as Error)
    //     }
    //     setMoreSettings(false);
    // }

    return (
        <div className="pt-20 auto-limit-w flex flex-col">
            <div className="card space-y-3">
                <h1>Connect</h1>
                <table className="table-fixed w-full text-center border-collapse border" cellPadding="5">
                    <thead>
                        <tr className="border">
                            <th className="w-2/3">
                                Device
                            </th>
                            <th>
                                Disconnect
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            devices.length ? devices.map(d => (
                                <tr className="border" key={d.index}>
                                    <td>{d.name + (d instanceof PeerDevice ? "Online" : "") }</td>
                                    <td><button className="underline" onClick={() => d.emit("deviceremoved")}>Disconnect</button></td>
                                </tr>
                            )) : 
                            <tr className="border">
                                <td colSpan={2}>No Devices Connected</td>
                            </tr>
                        }
                    </tbody>
                </table>
                {moreSettings && <input type="text" className="input w-full" placeholder="Initiface Server URL" value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />}
                <div className="action-container flex-wrap">
                    {
                        !client?.connected ?
                        <>
                            {/* <button className="action" onClick={embedded_connect}>WebBluetooth</button> */}
                            <button className="action" onClick={external_connect}>Intiface</button>
                            <button className="action" onClick={() => setMoreSettings(!moreSettings)}>More Settings</button>
                        </> :
                        <>
                            {
                                !client.isScanning ?
                                <button className="action" onClick={startScanning}>Scan Devices</button>
                                : <button className="action" onClick={stopScanning}>Stop Scanning</button>
                            }
                            <button className="action" onClick={client.disconnect}>Back</button>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

Settings.getLayout = (page) => {
    return (
        <MainLayout>
            <ButtplugLayout>
                {page}
            </ButtplugLayout>
        </MainLayout>
    )
};

export default Settings;