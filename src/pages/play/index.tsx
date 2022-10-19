import { ButtplugContext } from "components/ButtplugContext";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from 'styles/Slider.module.css';

const Play: NextPage = () => {
    const { client, devices } = useContext(ButtplugContext);
    const router = useRouter();

    useEffect(() => {
        if (!client?.Connected) {
            router.push("/play/settings");
        }
    })
    return (
        <div className="auto-limit-w pt-20 space-y-3">
            {
                devices.map((d) => (
                    <div className="card space-y-3" key={d.Index}>
                        <h1>
                           {d.Name} 
                        </h1>
                        <div className="pb-2">
                            <Slider onChange={(e) => d.vibrate(e as number / 100)} className={styles.slider} />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button className="action" onClick={() => d.stop()}>Stop</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Play;