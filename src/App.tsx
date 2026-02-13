import './App.css'
import type React from 'react';
import { useState, useEffect, useMemo, useRef } from "react"

import Header from './components/Header';
import Form from './components/Form';
import Sort from './components/Sort';
import TasksList from './components/TasksList';
import Quote from './components/Quote';

import type { Crypto, Task } from './types/task';

function App() {

  const [newTask, setNewTask] = useState<string>('')
  const [editTargetFocus, setEditTargetFocus] = useState<Task | null>(null)
  const [priorityEdit, setPriorityEdit] = useState<Crypto | null>(null)
  const [filterBy, setFilterBy] = useState<string>('All')
  const [sortBy, setSortBy] = useState<string>('Priority')
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isInside = !!target.closest('[data-safe-click="true"]');
        
      if (isInside) return;

      setEditTargetFocus(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const prioritys = [1, 2, 3, 4]

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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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

  const handleChangePriority = (task: Task, priority: number) => {
    task.priority = priority
    setTasks((prev) => [...prev.filter((t) => t !== task), task])
    setPriorityEdit(null)
  }

  const handleChangeTaskStatus = (task: Task) => {
    task.status = task.status === "Completed" ? "Uncompleted" : "Completed"
    setTasks((prev) => [...prev.filter((t) => t.id !== task.id), task])
  }

  const handleEditTask = (task: Task) => {
    
  }

  const handleRemoveTask = (task: Task) => {
    
  }

  // add to localStorage

  return (
    <div className='flex align-middle justify-center bg-[url("./assets/background.jpg")] bg-cover bg-center bg-no-repeat h-screen p-20'>
      <div className='flex flex-col min-h-80 min-w-230 border-2 border-white/40 backdrop-blur rounded-4xl'>
        <Header />

        <div className='flex flex-row gap-10 w-full px-6 py-4 h-full'>
          <div className='flex flex-col justify-between w-4/5'>
            <Form
              handleFormSubmit={handleFormSubmit}
              handleInput={handleInput}
              newTask={newTask}
            />

            <Sort sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          <div className='flex flex-col w-full'>
            <TasksList
              filterBy={filterBy}
              handleChangeFilter={handleChangeFilter}
              filteredTasks={filteredTasks}
              editTargetFocus={editTargetFocus}
              setEditTargetFocus={setEditTargetFocus}
              priorityEdit={priorityEdit}
              setPriorityEdit={setPriorityEdit}
              prioritys={prioritys}
              handleChangeTaskStatus={handleChangeTaskStatus}
              handleChangePriority={handleChangePriority}
              handleEditTask={handleEditTask}
              handleRemoveTask={handleRemoveTask}
            />
            <Quote />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
