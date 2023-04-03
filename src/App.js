import { useState,useRef, useEffect } from 'react';
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
  };

useEffect(()=>{
  const saveTodos =JSON.parse(localStorage.getItem("todos"));
  if(saveTodos){
    setTodos(saveTodos);
  }
},[])
  useEffect(()=>{
   localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])

  // 絞り込み
  // const [filterTodoo, setfilterTodo]=useState('') ;



// 完了未完了を入れ替えるtoggle
const toggleTodo =(id) =>{
  const newTodos =[...todos];
  const todo =newTodos.find((todo)=>todo.id === id);
todo.completed = !todo.completed;
setTodos(newTodos);
}
// 完了したタスクの削除ボタン
const handleClear =()=>{
  const newTodos =todos.filter((todo)=>!todo.completed);
  setTodos(newTodos)
}

const filterComp =()=>{
  console.log("完了");
  const comptodos =todos.filter((todo)=>todo.completed);
  console.log(comptodos);
  // setTodos(comptodos);
  return (<div>
   <TodoList todos={todos} toggleTodo={toggleTodo}/>
  </div>)
  }
const filterYet =()=>{
  console.log('未完了');
  const yettodos =todos.filter((todo)=>!todo.completed);
  console.log(yettodos);
  return (<div>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
   </div>)
}

  return (
    <div className="App">
    <div className='container'>
      <h1>Todoリスト</h1>
      <div className='container-inner'>
      <input type="text" placeholder='タスクを入力' ref={todoNameRef}/>

      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>タスクを削除</button> 
      <button onClick={filterComp}>完了</button>
      <button onClick={filterYet}>未完了</button>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      </div>
    </div>

    </div>
  );
}

export default App;
