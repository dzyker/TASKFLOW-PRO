import './App.css'
import { useState, useEffect, useMemo } from "react"
import { GrClose, GrCheckmark } from "react-icons/gr";
import { MdEdit } from "react-icons/md";

interface Task {
  id: Crypto;
  date: Date;
  text: string;
  status: string;
  priority: number;
}
type Crypto = `${string}-${string}-${string}-${string}-${string}`

function App() {

  const [newTask, setNewTask] = useState<string>('')
  const [editTargetFocus, setEditTargetFocus] = useState<Task | null>(null)
  const [priorityEdit, setPriorityEdit] = useState<Crypto | null>(null)
  const [filterBy, setFilterBy] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('Priority')
  const [tasks, setTasks] = useState<Task[]>([])

  const date: string = String(new Date().toLocaleDateString().split("."))
  const monthsList: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthsList[Number(date.slice(3, 5)) - 1]

  const filteredTasks = useMemo(() => {
    let result = [...tasks]
    if (filterBy === "All") {
      return result
    } else if (filterBy === "Completed") {
      result = result.filter((task) => task.status === "Completed")
    } else if (filterBy === "Uncompleted") {
      result = result.filter((task) => task.status === "Uncompleted")
    }
    // sortTasks()
    return result
  } , [tasks, filterBy])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.trim()) {
      setNewTask('')
    }
    setNewTask(event.target.value)
  }

  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newTask) {
      setNewTask('')
      return
    }
    setTasks((prev) => [...prev, {
        id: crypto.randomUUID(),
        text: newTask.trim(),
        date: new Date(),
        status: 'Uncompleted',
        priority: 4,
      }
    ])
    setNewTask('')
  }

  const sortTasks = () => {
    
  }
  
  const handleChangeFilter = (filterBy: string) => {
    if (filterBy === "All") {
      setFilterBy("Completed")
    } else if (filterBy === "Completed") {
      setFilterBy("Uncompleted")
    } else {
      setFilterBy("All")
    }
  }

  const handleCompleteTask = (task: Task) => {

  }

  const handleEditTask = (task: Task) => {
    
  }

  const handleRemoveTask = (task: Task) => {
    
  }

  // add to localStorage

  return (
    <div className='flex align-middle justify-center bg-[url("./assets/background.jpg")] bg-cover bg-center bg-no-repeat h-screen p-20'>
      <div className='flex flex-col min-h-80 min-w-230 border-2 border-white/40 backdrop-blur rounded-4xl'>
        <div className='flex flex-row w-full px-6 py-4 justify-between text-3xl font-bold'>
          <span>TASKFLOW PRO</span>
          <span>{date.slice(-4)} {month} {date.slice(0, 2)}</span>
        </div>

        <div className='flex flex-row gap-10 w-full px-6 py-4 h-full'>
          <div className='flex flex-col justify-between'>
            <form className='flex flex-col gap-8 text-xl text-white' onSubmit={handleFormSubmit} >
              <input className='backdrop-blur-md bg-linear-to-r from-purple-500/40 to-blue-500/40
                   shadow-[0_4px_16px_0_rgba(147,51,234,0.4)]
                   outline-0
                   hover:shadow-[0_8px_24px_0_rgba(147,51,234,0.5)]
                   transition-shadow duration-300 border border-white/30 rounded-2xl px-4 py-2' type="text" onChange={handleInput} value={newTask} placeholder="Please enter a Task" />
              <button className='bg-[#8FE5C6] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] shadow-[#8FE5C6] rounded-2xl px-4 py-2 cursor-pointer' type='submit'>Submit</button>
            </form>

            {editTargetFocus && (
              <div className='flex flex-row'>
                {editTargetFocus.status != "Completed" && 
                  <button className='rounded-full' onClick={() => handleCompleteTask(editTargetFocus)}><GrCheckmark /></button>
                }
                <button className='rounded-full' onClick={() => handleEditTask(editTargetFocus)}><MdEdit /></button>
                <button className='rounded-full' onClick={() => handleRemoveTask(editTargetFocus)}><GrClose /></button>
              </div>
            )}

            <div className='flex flex-col gap-3 mb-16 text-center'>
              <span className='text-xl block w-full'>Sort</span>
              <div className='grid grid-cols-3 gap-3 font-bold text-2xl text-center justify-center w-full border-2 rounded-4xl border-white/40 backdrop-blur-md'>
                <label className={
                  'p-2 border-2 rounded-4xl border-white/40 backdrop-blur-md cursor-pointer transition-all ' +
                  (sortBy === 'Priority' ? 'bg-transparent bg-linear-to-r from-pink-600/50 to-purple-600/50 bg-[length:100%_0.4em] bg-no-repeat bg-bottom' : 'bg-[#E6E6E6] ') +
                  (sortBy !== 'Priority' ? 'hover:bg-[#D6D6D6]' : '')
                }>
                  <span className="p-3">Priority</span>
                  <input type='radio' name="sort" value="Priority" className='hidden' checked={sortBy === "Priority"} onChange={(event) => setSortBy(event.target.value)}></input>
                </label>
                <label className={
                  'p-2 border-2 rounded-4xl border-white/40 backdrop-blur-md cursor-pointer transition-all ' +
                  (sortBy === 'Status' ? 'bg-transparent bg-linear-to-r from-pink-600/50 to-purple-600/50 bg-[length:100%_0.4em] bg-no-repeat bg-bottom' : 'bg-[#E6E6E6] ') +
                  (sortBy !== 'Status' ? 'hover:bg-[#D6D6D6]' : '')
                }>
                  <span className="p-3">Status</span>
                  <input type='radio' name="sort" value="Status" className='hidden' checked={sortBy === "Status"} onChange={(event) => setSortBy(event.target.value)}></input>
                </label>
                <label className={
                  'p-2 border-2 rounded-4xl border-white/40 backdrop-blur-md cursor-pointer transition-all ' +
                  (sortBy === 'Date' ? 'bg-transparent bg-linear-to-r from-pink-600/50 to-purple-600/50 bg-[length:100%_0.4em] bg-no-repeat bg-bottom' : 'bg-[#E6E6E6] ') +
                  (sortBy !== 'Date' ? 'hover:bg-[#D6D6D6]' : '')
                }>
                  <span className="p-3">Date</span>
                  <input type='radio' name="sort" value="Date" className='hidden' checked={sortBy === "Date"} onChange={(event) => setSortBy(event.target.value)}></input>
                </label>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <span className='font-bold cursor-pointer' onClick={() => handleChangeFilter(filterBy)}>{filterBy + " Tasks:"}</span>
              <ul>
                {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                  <li onClick={() => {
                      setEditTargetFocus(task)
                    }} key={task.id} className={'' + (editTargetFocus === task ? "" : "")}
                  >
                    <span>{task.text}</span>
                    <button onClick={() => setPriorityEdit(task.id)}>{task.priority}
                      {priorityEdit === task.id && 
                        <>
                        
                        </>
                      }
                    </button>
                  </li>
                )) : <li>No Tasks</li>}
              </ul>
            </div>

            <div className='flex flex-row'>
              <div className='flex flex-col'>
                <span>quote</span>
                <span>author</span>
              </div>

              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
