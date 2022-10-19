import { NextPageWithLayout } from "next";
import { useContext } from "react";
import { ButtplugContext } from "components/ButtplugContext";
import { ButtplugEmbeddedConnectorOptions } from "buttplug";

const Settings: NextPageWithLayout = () => {
    const buttplugContext = useContext(ButtplugContext);

    const embedded_connect = async () => {
        const opts = new ButtplugEmbeddedConnectorOptions();
        const client = buttplugContext.client;
        if (client?.Connected) {
            await client?.disconnect();
        }
        try {
            await client?.connect(opts);
            await client?.startScanning();
        }
        catch (e) {
            console.log(e);
            client?.disconnect();
        }
    }
    return (
        <button onClick={embedded_connect}>hi</button>
    )
}
export default Settings;