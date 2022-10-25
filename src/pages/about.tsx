import { NextPage } from "next";
import Link from "next/link";

const About: NextPage = () => {
    return (
        <div className="auto-limit-w pt-20">
            <div className="card space-y-3">
                <h1>What is this?</h1>
                <div>
                    Buzzy! is a Progressive Web App for controlling IoT adult toys across the internet (using WebRTC P2P) and locally (through Bluetooth and Intiface). It also uses the Buttplug-rs library for support across a wide range of device models.<br/>
                    The point of this project is to make a teledildonics application that respects your privacy, is open-source, convenient, and Peer-to-Peer that works both online and offline.<br/>
                    All of the controller networking is Peer-2-Peer with each client sending each other data. That means:<br/>
                    - Privacy as data cannot be intervened by a server. <br/>
                    - Lower latency as clients are streaming directly to each other. <br/>
                    - Compatiblity with a wide range of device models. <br/>
                </div>
                <div className="action-container">
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
