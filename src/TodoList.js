import React, { useState } from 'react'

const TodoList = ({items, removeTodo, setTodoList, completeTodo}) => {

  const [edit, setEdit] = useState(false)
  
  const handleEdit = (text, index)=>{
    const updatedItems = [...items];
    updatedItems[index].title = text;
    setEdit(false);
    setTodoList(updatedItems);
  }

  return (
    <div>
      {items.map((item, index)=>{
        const {id, title, isCompleted} = item
        return(
          <article key={id}  className = {isCompleted ? 'complete' : 'todo-row'}>
           {edit ? <input type='text' defaultValue={title}  onBlur={(e)=>handleEdit(e.target.value, index)}/> :
            <span onDoubleClick={()=>setEdit(true)}>{title}</span>}
            <div>
              <button onClick={()=>{removeTodo(id)}}>Del</button>
              <button onClick={()=>{completeTodo(id)}}>{isCompleted? 'Activate' : 'Complete'}</button>
            </div>
          </article>
          )
      })}
    </div>
  )
}

export default TodoList
