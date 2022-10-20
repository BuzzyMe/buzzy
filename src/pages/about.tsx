import { NextPage } from "next";
import Link from "next/link";

const About: NextPage = () => {
    return (
        <div className="auto-limit-w pt-20">
            <div className="card space-y-3">
                <h1>What is this?</h1>
                <div>
                    It&apos;s an open-source adult toy controller that works through WebRTC and Buttplug.io. <br/>
                    Therefore, all of the controller networking is Peer-2-Peer with each client sending each other data. That means:<br/>
                    - Privacy as data cannot be intervened by a server. <br/>
                    - Lower latency as clients are streaming directly to each other. <br/>
                    - Compatiblity with over 190 adult toy models. <br/>
                </div>
                <div className="flex justify-end gap-3">
                    <Link href="https://github.com/jy1263/buzzy-next">
                        <a className="action">
                            Source Code
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About;