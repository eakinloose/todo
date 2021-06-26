import React, { useState } from 'react'
import TodoList from './TodoList'

const Todo = () => {
  const [todos, setTodos] = useState('')
  const [todosCate, setTodosCate] = useState('')
  const [todoList, setTodoList] = useState([])
  const [edit, setEdit] = useState(false)
  const [editID, setEditID] = useState(null)

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!todos || !todosCate){
      return;
    }
    else if(edit){
      setTodoList(todoList.map((item)=>{
        if(item.id === editID){
          return {...item, title: todos, category: todosCate}
        }
        return item 
      }))
      setTodos('')
      setTodosCate('')
      setEdit(false)
      setEditID(null)
    }
    else{
      const newTodo = {
      id: Math.floor(Math.random() * 999999999999999999999),
      title: todos,
      category: todosCate
      }
      setTodoList([newTodo, ...todoList])
      setTodos('')
      setTodosCate('')
    }
  }

  const removeTodo = (id) => {
    setTodoList(todoList.filter((items)=>items.id !== id))
  }

  const editTodoHandler = (id) => {
    const itemToEdit = todoList.find(((items) => items.id === id))
    setEdit(true)
    setEditID(id)
    setTodos(itemToEdit.title)
    setTodosCate(itemToEdit.category)
  }

  const completeTodo = (id) => {
    let completedTodo = todoList.map((item)=>{
      if(item.id === id){
        item.isCompleted = !item.isCompleted;
      }
      return item;
    })
    setTodoList(completedTodo)
  }

  // const clearAllHandler =()=>{
    
  //   if (todoList.length < 1){
  //     alert('Nothing to clear... list is empty')
  //   }

  //   setTodoList([])
  // }

  return (
    <section>
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input'>add Todo</label>
        <input id='input' placeholder='enter task' value={todos} onChange={(e)=>setTodos(e.target.value)}/>
        <label htmlFor='input-cate'>Category</label>
        <input id='input-cate' placeholder='category' value={todosCate} onChange={(e)=>setTodosCate(e.target.value)}/>
        <button type="submit">{edit? 'Edit Todo' : 'Add Todo'}</button>
      </form>
      <main>
        {todoList.length > 0 && (
          <div className='list-sect'>
            <TodoList items={todoList} removeTodo={removeTodo} completeTodo={completeTodo} editTodoHandler={editTodoHandler}/>
          </div>
        )}
      </main>
      <footer>
        <p>Double-click to edit a todo</p>
        <p>Created by Bobo</p>
        <p>Part of TodoMVC</p>
      </footer>
      {/* <button onClick={clearAllHandler}>clear</button> */}
    </section>
  )
}

export default Todo;