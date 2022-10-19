import { ButtplugClient, buttplugInit } from "buttplug";
import React, { Component, ReactNode } from "react";
import { ButtplugContext, ButtplugContextState, DefaultButtplugContext } from ".";

const isSSR = () => typeof window === "undefined"; 

interface ButtplugProviderProps {
    children: React.ReactNode
}

export class ButtplugProvider extends Component<ButtplugProviderProps, ButtplugContextState> {
    constructor(props: ButtplugProviderProps) {
        super(props);
        this.state = {...DefaultButtplugContext};
        this
    }
    componentDidMount(): void {
        buttplugInit().then(() => {
            const client = new ButtplugClient("Buzzy");
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
