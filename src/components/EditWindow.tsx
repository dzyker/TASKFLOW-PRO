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

    const handleInputDesctiprion = (e: React.ChangeEvent<HTMLInputElement>):void => {
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
        <form data-safe-click="true" onSubmit={handleSumbitEdit}>
            <input type="text" value={editTaskTitle} onChange={handleInputTitle} className='w-full backdrop-blur-md bg-linear-to-r from-cyan-500/40 to-blue-500/40 shadow-[0_4px_16px_0_rgba(36,186,255,0.4)] outline-0 hover:shadow-[0_8px_24px_0_rgba(36,186,255,0.5)] transition-shadow duration-300 border border-white/30 rounded-2xl px-4 py-2' />
            <input type="text" value={editTaskDescription} onChange={handleInputDesctiprion} className='w-full h-30 bg-amber-50' />
            <button type="submit">Change</button>
        </form>
    </div>
  )
}

export default EditWindow