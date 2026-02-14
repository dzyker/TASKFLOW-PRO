import './App.css'
import type React from 'react';
import { useState, useEffect, useMemo } from "react"

import Header from './components/Header';
import Form from './components/Form';
import Sort from './components/Sort';
import TasksList from './components/TasksList';
import Quote from './components/Quote';

import type { Crypto, Task } from './types/task';
import EditWindow from './components/EditWindow';

function App() {

  const [editTargetFocus, setEditTargetFocus] = useState<Task | null>(null)
  const [priorityEdit, setPriorityEdit] = useState<Crypto | null>(null)
  const [filterBy, setFilterBy] = useState<string>('All')
  const [reverseSort, setReverseSort] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>('Priority')
  const [tasks, setTasks] = useState<Task[]>([])
  const [editTask, setEditTask] = useState<Task | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isInside = !!target.closest('[data-safe-click="true"]');
        
      if (isInside) return;

      setEditTargetFocus(null);
      setEditTask(null)
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sortBy]);
  
  const filteredTasks = useMemo(() => {

    const sortTasks = (result: Task[], sortBy: string, reverseSort: boolean) => {
      if (reverseSort) {
        if (sortBy === "Priority") {
          result.sort((a, b) => b.priority - a.priority)
        } else if (sortBy === "Status") {
          result.sort((a, b) => {
            if (a.status === b.status) return 0
            if (a.status === "Completed") return -1
            if (a.status === "Ccompleted") return 1
            return 0
          })
        } else if (sortBy === "Date") {
          result.sort((a, b) => a.date.getTime() - b.date.getTime())
        }
      } else {
        if (sortBy === "Priority") {
          result.sort((a, b) => a.priority - b.priority)
        } else if (sortBy === "Status") {
          result.sort((a, b) => {
            if (a.status === b.status) return 0
            if (a.status === "Uncompleted") return -1
            if (a.status === "Uncompleted") return 1
            return 0
          })
        } else if (sortBy === "Date") {
          result.sort((a, b) => b.date.getTime() - a.date.getTime())
        }
      }
      return result
    }

    let result = [...tasks]
    result = sortTasks(result, sortBy, reverseSort)
    if (filterBy === "All") {
      return result
    } else if (filterBy === "Completed") {
      result = result.filter((task) => task.status === "Completed")
    } else if (filterBy === "Uncompleted") {
      result = result.filter((task) => task.status === "Uncompleted")
    }
    return result 
  } , [tasks, filterBy, sortBy, reverseSort])

  
  // add to localStorage

  return (
    <div className='flex align-middle justify-center bg-[url("./assets/background.jpg")] bg-cover bg-center bg-no-repeat h-screen p-20'>
      <div className='flex flex-col lg:min-h-80 lg:min-w-230 border-2 border-white/40 backdrop-blur rounded-4xl'>
        <Header />

        <div className='flex flex-row gap-10 w-full px-6 py-4 h-full'>
          <div className='flex flex-col'>
            <Form
              tasks={tasks}
              setTasks={setTasks}
            />

            <Sort sortBy={sortBy} setSortBy={setSortBy} reverseSort={reverseSort} setReverseSort={setReverseSort}/>

            {editTask && editTargetFocus && <EditWindow task={editTask} setTasks={setTasks} setEditTask={setEditTask} />}
          </div>

          <div className='flex flex-col w-full'>
            <TasksList
              filterBy={filterBy}
              setFilterBy={setFilterBy}
              filteredTasks={filteredTasks}
              editTargetFocus={editTargetFocus}
              setEditTargetFocus={setEditTargetFocus}
              priorityEdit={priorityEdit}
              setPriorityEdit={setPriorityEdit}
              setTasks={setTasks}
              setEditTask={setEditTask}
              editTask={editTask}
            />
            <Quote />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
