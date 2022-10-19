import { NextPage } from "next";
import { useContext } from "react";
import { ButtplugContext } from "components/ButtplugContext";
import { ButtplugEmbeddedConnectorOptions } from "buttplug";

const Settings: NextPage = () => {
    const { client, devices } = useContext(ButtplugContext);

    const embedded_connect = async () => {
        const opts = new ButtplugEmbeddedConnectorOptions();
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
                            
                            devices.map(d => (
                                <tr className="border" key={d.Index}>
                                    <td>{d.Name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <button className="action" onClick={embedded_connect}>WebBluetooth</button>
                </div>
            </div>
        </div>
    )
}
export default Settings;