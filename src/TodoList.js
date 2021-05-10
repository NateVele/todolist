import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import SearchBar from './SearchBar';

function TodoList() {
  const [todos, setTodos] = useState([]);

  console.log(todos);

    useEffect(() => {
      if (localStorage.length < 1) {
        return;
      }

      let oldTodos = [];

      for (let i = 0; i < localStorage.length; i++) {
        let obj = localStorage.key(i);
        let myval = localStorage.getItem(obj);
    
        let mytodo = {
          id: obj,
          text: myval
        };
        
        oldTodos.push(mytodo);
      } 
      setTodos(oldTodos);
      console.log(...todos);
    }, [])

  const addTodo = todo => {

    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [...todos, todo];
    localStorage.setItem(todo.id, todo.text);
    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    for (let i = 0; i < localStorage.length; i++) {
      if (sessionStorage.key(i) == todoId) {
        localStorage.setItem(todoId, newValue.text); //fix
        break;
      }
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    localStorage.removeItem(id);
    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href="/";
  }

  const search = (input) => {
    if (!input || /^\s*$/.test(input)) {
      alert('Please enter a value')
      return;
    }

    let results = []
    let resCount = 0;
    
      for (let i = 0; i < localStorage.length; i++) {
          let obj = localStorage.getItem(localStorage.key(i));

          let searchVal = input;
          

          if (obj.includes(searchVal)) {
              results.push(obj);
              resCount++;
          }
      }
      if (resCount == 0) {
        alert('Nothing found');
      } else {
        alert('Found ' + resCount + " results: " + results);  
      } 
  }

  return (
    <>
      <h1>Welcome, {sessionStorage.getItem('user')}</h1>
      <SearchBar search={search}/>
      <TodoForm onSubmit={addTodo} />
      <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </>
  );
}

export default TodoList;