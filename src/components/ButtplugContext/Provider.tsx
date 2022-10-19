import { ButtplugClient, buttplugInit } from "buttplug";
import React, { Component, ReactNode } from "react";
import { ButtplugContext, ButtplugContextState, DefaultButtplugContext } from ".";

interface ButtplugProviderProps {
    children: React.ReactNode
}

export class ButtplugProvider extends Component<ButtplugProviderProps, ButtplugContextState> {
    constructor(props: ButtplugProviderProps) {
        super(props);
        this.state = {...DefaultButtplugContext};
    }
    componentDidMount(): void {
        buttplugInit().then(() => {
            const client = new ButtplugClient("Buzzy");
            client.on("deviceadded", (e) => {
                this.setState({
                    devices: [...this.state.devices, e]
                })
            })
            client.on("deviceremoved", (e) => {
                const devices = [...this.state.devices]
                this.setState({
                    devices: devices.filter((d) => d.Index !== e.Index)
                })
            })
            this.setState({
                client,
                initialized: true
            })
        })
    }
    render(): ReactNode {
        return (
            <ButtplugContext.Provider value={this.state}>
                {this.props.children}
            </ButtplugContext.Provider>
        )
    }
}
