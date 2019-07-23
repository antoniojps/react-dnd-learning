import React from 'react'
import styled from 'styled-components/macro'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  display: flex;
  align-items: center;
`

const Handle = styled.div`
  width: 24px;
  height: 24px;
  background-color: lightblue;
  border-radius: 4px;
  margin-right: 8px;
`

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <Handle {...provided.dragHandleProps} />
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}

export default Task
