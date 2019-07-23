import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import initialData from './initial-data'
import Column from './Column'
import { DragDropContext } from 'react-beautiful-dnd'

const App = () => {
  const [state, setState] = useState(initialData)

  // synchronously update your state to reflect the drag and drop result
  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    console.log(result)
    if (!destination) return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return
    const column = state.columns[source.droppableId]
    const newTaskIds = [...column.taskIds]
    newTaskIds.splice(source.index, 1)
    newTaskIds.splice(destination.index, 0, draggableId)
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    }
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    }
    setState(newState)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {initialData.columnOrder.map(columnId => {
        const column = state.columns[columnId]
        const tasks = column.taskIds.map(taskId => state.tasks[taskId])

        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
