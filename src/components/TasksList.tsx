import type React from 'react';
import { GrClose, GrCheckmark } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import type { Task, Crypto } from '../types/task';

interface TasksListProps {
    filterBy: string;
    setFilterBy: React.Dispatch<React.SetStateAction<string>>;
    filteredTasks: Task[];
    editTargetFocus: Task | null;
    setEditTargetFocus: React.Dispatch<React.SetStateAction<Task | null>>;
    priorityEdit: Crypto | null;
    setPriorityEdit: React.Dispatch<React.SetStateAction<Crypto | null>>;
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    setEditTask: React.Dispatch<React.SetStateAction<Task | null>>
    editTask: Task | null
}

const TasksList = ({
    filterBy,
    setFilterBy,
    filteredTasks,
    editTargetFocus,
    setEditTargetFocus,
    priorityEdit,
    setPriorityEdit,
    setTasks,
    setEditTask,
    editTask,
}: TasksListProps) => {

    const handleChangeTaskStatus = (task: Task) => {
        task.status = task.status === "Completed" ? "Uncompleted" : "Completed"
        setTasks((prev) => [...prev.filter((t) => t.id !== task.id), task])
    }

    const handleEditTask = (task: Task) => {
        editTask ? setEditTask(null) : setEditTask(task)
    }

    const handleRemoveTask = (task: Task) => {
        setTasks(prev => prev.filter(t => t !== task))
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

    const priorityColors = ['#be123c', '#f97316', '#84cc16', '#3b82f6']

    const prioritys = [1, 2, 3, 4]

    const changeValues1 = (): void => {
        setEditTargetFocus(null)
        setEditTask(null)
    }

    const changeValues2 = (task: Task): void => {
        setEditTask(null)
        setEditTargetFocus(task)
    }

    return (
        <div className='flex flex-col'>
            <div className="mb-2 text-xl lg:text-2xl flex flex-row justify-center gap-2 cursor-pointer" onClick={() => handleChangeFilter(filterBy)}>
                <div className={"mt-1 w-3 h-3 self-center border rounded-full " + (filterBy === "All" ? "bg-gray-400" : filterBy === "Completed" ? "bg-green-400" : "bg-red-400")}></div>
                <span
                    className='font-semibold block text-center mr-4'
                    
                >
                    {filterBy + " Tasks"}
                </span>
            </div>

            <ul>
                {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                    <li
                        data-safe-click="true"
                        key={task.id}
                        className='border rounded-2xl flex flex-col mb-2'
                    >
                        <div
                            onClick={() => {
                                editTargetFocus === task
                                    ? changeValues1()
                                    : changeValues2(task)
                            }}
                            className={
                                'flex flex-row align-middle justify-between rounded-t-2xl p-1 px-5 ' +
                                (editTargetFocus === task ? "bg-[#f5f5f56d]" : "")
                            }
                        >
                            <button
                                className={
                                    'flex self-center w-6 h-6 rounded-full border p-1 cursor-pointer ' +
                                    (task.status === "Completed" ? "bg-[#03ff46]" : "bg-gray-100")
                                }
                                onClick={(event) => {
                                    event.stopPropagation()
                                    handleChangeTaskStatus(task)
                                }}
                            >
                                <GrCheckmark />
                            </button>
                            <span
                                className='text-xl'
                            >
                                {task.title}
                            </span>
                            <div onMouseLeave={() => setPriorityEdit(null)} className='flex flex-row gap-0.5 border rounded-full'>
                                {priorityEdit === task.id && prioritys.filter(p => p !== task.priority).map(priority => (
                                    <button key={crypto.randomUUID()} onClick={(event) => {
                                        event.stopPropagation()
                                        handleChangePriority(task, priority)
                                    }} className='border rounded-full p-2 w-8 h-8 cursor-pointer relative'
                                        style={{ backgroundColor: priorityColors[priority - 1] }}
                                    >
                                        <span className='block absolute inset-0 font-bold text-xl'>
                                            {priority}
                                        </span>
                                    </button>
                                ))}

                                <button onClick={(event) => {
                                    priorityEdit === task.id ? setPriorityEdit(null) : setPriorityEdit(task.id)
                                    event.stopPropagation()
                                }}
                                    className={'border rounded-full p-2 w-8 h-8 cursor-pointer relative ' + (priorityEdit === task.id && 'text-[#f5f5f5]')}
                                    style={{ backgroundColor: priorityColors[task.priority - 1] }}
                                >
                                    <span className='block absolute inset-0 font-bold text-xl'>
                                        {task.priority}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className={'w-full border-y-2 my-1 p-1 ' + (editTargetFocus === task ? "block" : "hidden")}>
                            <span>{task.description || "Has no description"}</span>
                        </div>
                        <div className={'flex-row w-full justify-around mb-1 ' + (editTargetFocus === task ? "flex" : "hidden")}>
                            <button
                                className={'rounded-full border p-1 cursor-pointer ' + (editTask ? 'bg-lime-400' : '')}
                                onClick={() => { handleEditTask(task) }}
                            >
                                <MdEdit />
                            </button>
                            <button
                                className='rounded-full border p-1 cursor-pointer bg-rose-500 text-white'
                                onClick={() => {
                                    handleRemoveTask(task)
                                    setEditTargetFocus(null)
                                    setEditTask(null)
                                }}
                            >
                                <GrClose />
                            </button>
                        </div>
                    </li >
                )) : (
                    <li className='text-center border rounded-2xl p-1'>No Tasks</li>
                )}
            </ul >
        </div >
    )
}

export default TasksList