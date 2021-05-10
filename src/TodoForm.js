import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');

  let count = 0;

  let prev = '';
  
  const inputRef = useRef(null);

  useEffect(() => {
    prev = inputRef.current.focus();
  }, []);

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!input || /^\s*$/.test(input)) {
      alert('Please enter a value')
      return;
    }
    
    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input
    });
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input placeholder='Update your item' value={input} onChange={handleChange} name='text' 
          ref={inputRef} className='todo-input edit'/>
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input placeholder='Type here to add a todo' value={input} onChange={handleChange} name='text' 
          className='todo-input'ref={inputRef}/>
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;