import React, { useEffect, useState } from 'react'
import TodoList from './TodoList'

const getLocalStorage = ()=> {
  let todoList = localStorage.getItem('todoList');
  if(todoList){
    return JSON.parse(todoList)
  }
  else{
    return []
  }
}

const Todo = () => {
  const [todos, setTodos] = useState('')
  const [todoList, setTodoList] = useState(getLocalStorage())
  const [edit, setEdit] = useState(false)
  const [editID, setEditID] = useState(null)

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!todos){
      return;
    }
    else if(edit){
      setTodoList(todoList.map((item)=>{
        if(item.id === editID){
          return {...item, title: todos}
        }
        return item 
      }))
      setTodos('')
      setEdit(false)
      setEditID(null)
    }
    else{
      const newTodo = {
      id: Math.floor(Math.random() * 99999999999999),
      title: todos
      }
      setTodoList([newTodo, ...todoList])
      setTodos('')
    }
  }

  const removeTodo = (id) => {
    setTodoList(todoList.filter((items)=>items.id !== id))
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

  useEffect(()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className="body">
      <div className="side">
        <h4>React</h4>
        <p>Velit tempor mollit ut pariatur proident reprehenderit labore duis cupidatat sit. Fugiat nulla cillum anim aliquip amet excepteur irure laboris irure. In ut ut et enim excepteur sint ex et nisi amet.Nulla et consectetur do et. In do velit ea ex Lorem laboris dolor ullamco do laborum. Laborum nisi consequat cillum ad consequat deserunt dolore eiusmod esse non enim laborum anim pariatur. Reprehenderit labore est eiusmod exercitation deserunt laborum exercitation. Incididunt non enim labore ex officia voluptate dolor consequat eiusmod ad culpa eu ex voluptate. Consequat duis nisi excepteur laboris laboris id adipisicing id in. Cupidatat duis mollit amet irure labore exercitation amet reprehenderit laboris nostrud.Do nulla consequat cupidatat consectetur irure culpa labore commodo est. Nisi consectetur magna Lorem anim irure id reprehenderit eu deserunt ipsum anim aliquip. Cillum velit officia incididunt ea. Esse aute non voluptate in ipsum ullamco qui reprehenderit. Nulla cillum non cillum Lorem officia mollit commodo elit minim exercitation reprehenderit deserunt ea elit. Deserunt amet non duis ut esse ipsum ad do cillum consequat aliqua minim laborum dolor.Adipisicing cillum nisi nulla consectetur ipsum amet consequat velit ad. Duis duis non nisi et irure aute. Aliqua qui magna quis fugiat. Eu excepteur non dolor esse adipisicing. Minim consectetur reprehenderit cillum exercitation labore cupidatat elit ad ex ut minim est consectetur. Tempor sint elit est tempor aliquip. Voluptate commodo dolor proident adipisicing sit incididunt non nisi adipisicing est aliqua excepteur.</p>
      </div>
      <section>
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder='What needs to be done?' value={todos} onChange={(e)=>setTodos(e.target.value)}/>
        </form>
        <main>
          {todoList.length > 0 && (
            <div className='list-sect'>
              <TodoList items={todoList} removeTodo={removeTodo} completeTodo={completeTodo} setTodoList={setTodoList}/>
            </div>
          )}
        </main>
        <footer>
          <p>Double-click to edit a todo</p>
          <p>Created by Bobo</p>
          <p>Part of TodoMVC</p>
        </footer>
      </section>
    </div>
  )
}

export default Todo;