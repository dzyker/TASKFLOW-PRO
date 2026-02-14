import { useState } from 'react'
import type { Task } from '../types/task';

interface Props {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const Form = ({ setTasks}: Props) => {
    const [newTask, setNewTask] = useState<string>('')

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.value.trim()) {
          setNewTask('')
        }
        setNewTask(event.target.value)
      }

    const handleFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!newTask) {
          setNewTask('')
          return
        }
        setTasks((prev) => [...prev, {
            id: crypto.randomUUID(),
            title: newTask.trim(),
            date: new Date(),
            status: 'Uncompleted',
            priority: 4,
            description: '',
          }
        ])
        
        setNewTask('')
      }

  return (
    <form data-safe-click="true" className='flex flex-col lg:w-75 xl:w-120 gap-4 sm:gap-5 md:gap-7 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white' onSubmit={handleFormSubmit} >
        <input className='backdrop-blur-md bg-linear-to-r from-purple-500/40 to-blue-500/40 shadow-[0_4px_16px_0_rgba(147,51,234,0.4)] outline-0 hover:shadow-[0_8px_24px_0_rgba(147,51,234,0.5)] transition-shadow duration-300 border border-white/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 text-sm sm:text-base md:text-lg' type="text" onChange={handleInput} value={newTask} placeholder="Please enter a Task" />
        <button className='bg-[#8FE5C6] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] shadow-[#8FE5C6] rounded-xl sm:rounded-2xl px-4 py-2 cursor-pointer text-sm sm:text-base md:text-lg font-semibold' type='submit'>Submit</button>
    </form>
  )
}

export default Form