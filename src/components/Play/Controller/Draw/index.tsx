import { ButtplugClientDevice } from "buttplug"
import { PeerDevice } from "modules/multiplayer/peer/device"
import { FC, useRef, useState } from "react"
import { DndContext, DragEndEvent, DragMoveEvent } from '@dnd-kit/core';
import { restrictToParentElement } from "@dnd-kit/modifiers";
import Draggable from "./Draggable";

interface DrawControllerProps {
    device: ButtplugClientDevice | PeerDevice
}

const DrawController: FC<DrawControllerProps> = ({device: d}) => {
    const container_ref = useRef<HTMLDivElement>(null);
    const vibrate_attributes = d.vibrateAttributes;
    const [vibrateStates] = useState<number[]>(Array(Number(vibrate_attributes?.length)).fill(0));

    const ondragmove = (e: DragMoveEvent) => {
        if (container_ref.current) {
            let num = -1 * e.delta.y / (container_ref.current.clientHeight - 100)
            num = num > 1 ? 1 : num;
            num = num <= 0 ? 0 : num;
            
            const index = Number(e.active.data.current?.index);
            const vibrateState = vibrateStates.at(index);
            if (typeof vibrateState === "number") {
                const thresholdMet = Math.abs(vibrateState - num) > 0.1 || num === 0;
                if (thresholdMet) {
                    vibrateStates[index] = num;
                    d.vibrate(vibrateStates);
                }
            }
        }
    }
    const ondragend = (e: DragEndEvent) => {
        const index = Number(e.active.data.current?.index);
        vibrateStates[index] = 0;
        d.vibrate(vibrateStates);
    }
    return (
        <div ref={container_ref} className="card h-96 w-full flex-col justify-end items-center flex">
            <DndContext onDragMove={ondragmove} onDragEnd={ondragend} modifiers={[restrictToParentElement]}>
                {
                    vibrateStates.map((e, i) => <Draggable key={i} id={"draggable-"+i} data={{ index: i }} />)
                }
            </DndContext>
        </div>
    )
}

export default DrawController;