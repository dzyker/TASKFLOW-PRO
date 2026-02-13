import type React from 'react';
import { GrClose, GrCheckmark } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import type { Task, Crypto } from '../types/task';

interface TasksListProps {
    filterBy: string;
    handleChangeFilter: (filterBy: string) => void;
    filteredTasks: Task[];
    editTargetFocus: Task | null;
    setEditTargetFocus: React.Dispatch<React.SetStateAction<Task | null>>;
    priorityEdit: Crypto | null;
    setPriorityEdit: React.Dispatch<React.SetStateAction<Crypto | null>>;
    prioritys: number[];
    handleChangeTaskStatus: (task: Task) => void;
    handleChangePriority: (task: Task, priority: number) => void;
    handleEditTask: (task: Task) => void;
    handleRemoveTask: (task: Task) => void;
}

const TasksList = ({
    filterBy,
    handleChangeFilter,
    filteredTasks,
    editTargetFocus,
    setEditTargetFocus,
    priorityEdit,
    setPriorityEdit,
    prioritys,
    handleChangeTaskStatus,
    handleChangePriority,
    handleEditTask,
    handleRemoveTask,
}: TasksListProps) => {
    return (
        <div className='flex flex-col w-full'>
            <span
                className='font-bold text-center cursor-pointer'
                onClick={() => handleChangeFilter(filterBy)}
            >
                {filterBy + " Tasks:"}
            </span>
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
                                    ? setEditTargetFocus(null)
                                    : setEditTargetFocus(task)
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
                                onClick={(event) => event.stopPropagation()}
                            >
                                {task.text}
                            </span>
                            {priorityEdit === task.id && (
                                <div onMouseLeave={() => setPriorityEdit(null)} className='flex flex-row gap-0.5 border rounded-full'>
                                    {prioritys
                                        .filter(priority => priority != task.priority)
                                        .map(priority => (
                                            <button
                                                key={priority}
                                                onClick={(event) => {
                                                    event.stopPropagation()
                                                    handleChangePriority(task, priority)
                                                }}
                                                className='border active:bg-blue-400 rounded-full p-2 w-8 h-8 cursor-pointer relative'
                                            >
                                                <span className='block absolute inset-0 font-bold text-xl'>
                                                    {priority}
                                                </span>
                                            </button>
                                        ))}
                                    <button
                                        onClick={(event) => {
                                            priorityEdit === task.id ? setPriorityEdit(null) : setPriorityEdit(task.id)
                                            event.stopPropagation()
                                        }}
                                        className='border rounded-full p-2 w-8 h-8 cursor-pointer relative text-[#f5f5f5] bg-[#3be13294]'
                                    >
                                        <span className='block absolute inset-0 font-bold text-xl'>
                                            {task.priority}
                                        </span>
                                    </button>
                                </div>
                            )}
                            {priorityEdit !== task.id && (
                                <button
                                    onClick={(event) => {
                                        setPriorityEdit(task.id)
                                        event.stopPropagation()
                                    }}
                                    className='border rounded-full p-2 w-8 h-8 cursor-pointer relative'
                                >
                                    <span className='block absolute inset-0 font-bold text-xl'>
                                        {task.priority}
                                    </span>
                                </button>
                            )}
                        </div>
                        <div className={'w-full border mb-1 ' + (editTargetFocus === task ? "block" : "hidden")}></div>
                        <div className={'flex-row w-full justify-around ' + (editTargetFocus === task ? "flex" : "hidden")}>
                            <button
                                className='rounded-full border p-1 cursor-pointer'
                                onClick={() => handleEditTask(task)}
                            >
                                <MdEdit />
                            </button>
                            <button
                                className='rounded-full border p-1 cursor-pointer'
                                onClick={() => handleRemoveTask(task)}
                            >
                                <GrClose />
                            </button>
                        </div>
                    </li>
                )) : (
                    <li className='text-center border rounded-2xl p-1'>No Tasks</li>
                )}
            </ul>
        </div>
    )
}

export default TasksList