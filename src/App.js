import { useState, useRef, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

// ローカルストレージに保存
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  // 完了未完了を入れ替えるtoggle
  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  }
  // 完了したタスクの削除ボタン
  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    setFilteredTodos([]);
  };
  
  //フィルター機能
  // 完了を押したら完了のみ表示
  const filterComp = () => {
    const comptodos = todos.filter((todo) => todo.completed);
    setFilteredTodos(comptodos);
  };
  // 未完了を押したら未完了のみ表示
  const filterYet = () => {
    const yettodos = todos.filter((todo) => !todo.completed);
    setFilteredTodos(yettodos);
  };

  // filteredTodosが更新された場合にuseEffectが発火し、TodoListに反映される
  useEffect(() => {
    setTodos(filteredTodos);
  }, [filteredTodos]);

  return (
    <div className="App">
      <div className='container'>
        <h1>Todoリスト</h1>
        <div className='container-inner'>
          <input type="text" placeholder='タスクを入力' ref={todoNameRef} />

          <button onClick={handleAddTodo}>タスクを追加</button>
          <button onClick={handleClear}>タスクを削除</button>
          <button onClick={filterComp}>完了</button>
          <button onClick={filterYet}>未完了</button>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
        </div>
      </div>

    </div>
  );
}

export default App;
