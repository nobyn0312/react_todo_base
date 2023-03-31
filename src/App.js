import { useState,useRef } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import {v4 as uuidv4} from 'uuid';


function App() {
  const [todos,setTodos]=useState([]);
  const todoNameRef =useRef();
  const handleAddTodo =(e)=>{
    const name =todoNameRef.current.value;
    if(name === "")return;
    setTodos((prevTodos)=>{
      return [...prevTodos,{id:uuidv4(),name:name,completed:false}];
    });
    todoNameRef.current.value =null;
  }

// 完了未完了を入れ替えるtoggle
const toggleTodo =(id) =>{
  const newTodos =[...todos];
  const todo =newTodos.find((todo)=>todo.id === id);
todo.completed = !todo.completed;
setTodos(newTodos);
}
const handleClear =()=>{
  const newTodos =todos.filter((todo)=>!todo.completed)
  setTodos(newTodos)
}

  return (
    <div className="App">
    <div className='container'>
      <h1>Todoリスト</h1>
      <div className='container-inner'>
      <input type="text" placeholder='タスクを入力' ref={todoNameRef}/>
             <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>タスクを削除</button> 


      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      </div>

    </div>

    </div>
  );
}

export default App;
