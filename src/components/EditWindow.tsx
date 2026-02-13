import { useState } from "react"

import type { Task } from "../types/task"

type Props = {
    task: Task
}

const EditWindow = ({task}: Props) => {

    const [editTaskTitle, setEditTaskTitle] = useState<string>(task.title)

  return (
    <div>
        <input type="text" value={editTaskTitle} onChange={(e) => setEditTaskTitle(e.target.value)} />
    </div>
  )
}

export default EditWindow