import { NextPageWithLayout } from "next";
import { useState } from "react";
import { ButtplugEmbeddedConnectorOptions, ButtplugWebsocketConnectorOptions } from "buttplug";
import useButtplugStore from "store/buttplug";
import MainLayout from "layout";
import ButtplugLayout from "layout/buttplug";

const Settings: NextPageWithLayout = () => {
    const { devices, client } = useButtplugStore();

    const [ moreSettings, setMoreSettings ] = useState(false);
    const [ serverUrl, setServerUrl ] = useState("");

    const connect = async (opts: ButtplugWebsocketConnectorOptions | ButtplugEmbeddedConnectorOptions) => {
        if (client?.Connected) {
            await client?.disconnect();
        }
        try {
            await client?.connect(opts);
        }
        catch (e) {
            console.log(e);
        }
        return client;
    }

    const external_connect = async () => {
        const opts = new ButtplugWebsocketConnectorOptions();
        if (serverUrl.length) {
            opts.Address = serverUrl;
        }
        connect(opts);
    }

    const embedded_connect = async () => {
        const client = await connect(new ButtplugEmbeddedConnectorOptions());
        try {
            await client?.startScanning();
        }
        catch (e) {
            console.log(e)
            await client?.disconnect();
        }
    }

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
                                <tr className="border" key={d.Index}>
                                    <td>{d.Name}</td>
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
                    <button className="action" onClick={embedded_connect}>WebBluetooth</button>
                    <button className="action" onClick={external_connect}>Intiface</button>
                    <button className="action" onClick={() => setMoreSettings(!moreSettings)}>More Settings</button>
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