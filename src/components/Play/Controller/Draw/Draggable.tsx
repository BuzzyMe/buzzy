import { FC } from "react";
import { useDraggable } from "@dnd-kit/core";

export type DraggableProps = Parameters<typeof  useDraggable>[0]

const Draggable: FC<DraggableProps> = (props) => {
    const {attributes, listeners, setNodeRef, transform} = useDraggable(props)
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <button className="max-w-fit card transition-none rounded-full aspect-square p-3 mx-3" ref={setNodeRef} style={style} {...listeners} {...attributes}>
            DRAW
        </button>
    )
}

export default Draggable