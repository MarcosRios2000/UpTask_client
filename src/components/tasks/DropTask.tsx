import { useDroppable, useDndContext } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}

export default function DropTask({status} : DropTaskProps) {

    const { isOver, setNodeRef } = useDroppable({
        id: status
    })
    const { active } = useDndContext()


    const style = {
        opacity: isOver ? 0.4 : undefined
    }

    const isDragging = !!active

  return (
    <>
    {isDragging && (
        <div
        style={style}
        ref={setNodeRef}
        className="text-xs fomt-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
        >
            Soltar tarea aquí
        </div>
        )}
    </>
  )
}
