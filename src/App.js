import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [filterType, setFilterType] = useState("all");
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };


  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);
  // useEffect(() => {
  //   const savedTodos = JSON.parse(localStorage.getItem('todos'));
  //   if (savedTodos) {
  //     setTodos(savedTodos);
  //   }
  // }, []);

  // 完了未完了を入れ替えるtoggle関数
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };
  // 完了したタスクの削除ボタン
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };


    // セレクトボックスのonChange関数
    const handleFilterChange = (e) => {
      const selectedFilterType = e.target.value;
      setFilterType(selectedFilterType);
    };
  
  // selectboxの切り替え
  useEffect(() => {
    if (filterType === "all") {
      setFilteredTodos(todos);
    } else if (filterType === "checked") {
      const completedTodos = todos.filter((todo) => todo.completed);
      setFilteredTodos(completedTodos);
    } else if (filterType === "unchecked") {
      const uncompletedTodos = todos.filter((todo) => !todo.completed);
      setFilteredTodos(uncompletedTodos);
    } 
  }, [todos, filterType]);

  return (
    <div className="App">
      <div className='container'>
        <h1>Todoリスト</h1>
        <div className='container-inner'>


        <div className='taskinputBox'>
          <label className='selectBox'>
          <select defaultValue="all" onChange={handleFilterChange} >
            <option value="all">全て</option>
            <option value="checked">完了済</option>
            <option value="unchecked">未完了</option>
          </select>
        </label>

        <div className='task'>
        <input type="text" placeholder='タスクを入力' ref={todoNameRef} />
        <button onClick={handleAddTodo}>タスクを追加</button>
          <button onClick={handleClear}>タスクを削除</button>
          <button onClick={handleAddTodo}>完了</button>
          <button onClick={handleClear}>未完了</button>
        </div>
        
        </div>


          <div className='taskBox'>
          <h2>タスク</h2>
          <div className='taskBoxinner'>
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;