import { useState } from "react"

import type { Task } from "../types/task"

type Props = {
    task: Task
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    setEditTask: React.Dispatch<React.SetStateAction<Task | null>>
}

const EditWindow = ({task, setTasks, setEditTask}: Props) => {

    const [editTaskTitle, setEditTaskTitle] = useState<string>(task.title)
    const [editTaskDescription, setEditTaskDescription] = useState<string>(task.description)

    const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>):void => {
        if (!e.target.value.trim()) {
            setEditTaskTitle('')
          }
          setEditTaskTitle(e.target.value)
    }

    const handleInputDesctiprion = (e: React.ChangeEvent<HTMLTextAreaElement>):void => {
        if (!e.target.value.trim()) {
            setEditTaskDescription('')
          }
          setEditTaskDescription(e.target.value)
    }

    const handleSumbitEdit = (event: React.SyntheticEvent<HTMLFormElement>):void => {
        event.preventDefault()
        task.title = editTaskTitle
        task.description = editTaskDescription
        setTasks(prev => [...prev.filter(t => t.id !== task.id), task])
        setEditTask(null)
    } 

  return (
    <div>
        <form data-safe-click="true" className="shadow-xl shadow-[#3d3d3d8c] border-2 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl" onSubmit={handleSumbitEdit}>
            <span className="block mb-2 sm:mb-3 text-base sm:text-lg md:text-xl lg:text-2xl px-1 sm:px-2">Edit your Task</span>
            <input type="text" value={editTaskTitle} onChange={handleInputTitle} className='w-full font-bold mb-3 sm:mb-4 backdrop-blur-md bg-linear-to-r from-cyan-500/40 to-blue-500/40 shadow-[0_4px_16px_0_rgba(36,186,255,0.4)] outline-0 hover:shadow-[0_8px_24px_0_rgba(36,186,255,0.5)] transition-shadow duration-300 border border-white/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg' />
            <textarea value={editTaskDescription} onChange={handleInputDesctiprion} className='w-full rounded-lg sm:rounded-xl h-16 sm:h-20 md:h-24 bg-amber-50 text-left align-top p-2 text-sm sm:text-base resize-y' />
            <button type="submit" className="cursor-pointer w-full border mt-2 sm:mt-3 rounded-full p-1.5 sm:p-2 bg-lime-300 text-gray-800 font-semibold text-sm sm:text-base md:text-lg">Change</button>
        </form>
    </div>
  )
}

export default EditWindow