import React, { useState ,useRef } from "react";
import TodoList from "./TodoList";
import {v4 as uuidv4} from "uuid"

function App(){
  const [todos , setTodos]=useState([
    {id:1 , name:"todo1" , completed:false}
  ]);

  const todoNameRef =useRef();
  const handleAddTodo =(e)=>{
      //タスクを追加する関数
    const name =todoNameRef.current.value;
    setTodos((prevTodos)=>{
      return[...prevTodos,{id:uuidv4(),name:name,completed:false}]
      })
    }

  return <div>
    <input type="text" ref={todoNameRef}/>
    <button onClick={handleAddTodo}>タスクを追加</button>
    <button>タスクを削除</button>
    <TodoList todos={todos}/>
  </div>;
};

export default App;
