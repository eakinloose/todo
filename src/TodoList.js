import React from 'react'

const TodoList = ({items, removeTodo, editTodoHandler, completeTodo}) => {

  return (
    <div>
      {items.map((item)=>{
        const {id, title, category, isCompleted} = item
        return(
          <article key={id} onDoubleClick={()=>{editTodoHandler(id)}} className = {isCompleted ? 'complete' : 'todo-row'}>
            <div>
              <h5>{title}</h5>
              <p>{category}</p>
            </div>
            <div>
              <button onClick={()=>{removeTodo(id)}}>Delete</button>
              <button onClick={()=>{completeTodo(id)}}>{isCompleted? 'Activate' : 'Complete'}</button>
            </div>
          </article>)
      })}
    </div>
  )
}

export default TodoList
