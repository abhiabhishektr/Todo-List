import React, { useState, useEffect } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [error, setError] = useState('');

    // Load todos from local storage on component mount
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    // Save todos to local storage whenever todos state changes
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleSubmit = () => {
        if (inputValue.trim() === '') {
            setError('Please enter a todo');
            return;
        }
        setError('');
        setTodos([...todos, inputValue]);
        setInputValue('');
    };

    const handleEditSubmit = () => {
        if (editValue.trim() === '') {
            setError('Please enter a todo');
            return;
        }
        setError('');
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = editValue;
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditValue('');
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(todos[index]);
    };

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        setEditIndex(null);
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter a todo"
            />
            <button onClick={handleSubmit}>Add Todo</button>
            <ul>
                {error && <p>{error}</p>}
                {todos.map((todo, index) => (
                    <li key={index}>
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={handleEditChange}
                                />
                                <button onClick={handleEditSubmit}>Update</button>
                            </>
                        ) : (
                            <>
                                {todo}{' '}
                                <button onClick={() => handleEdit(index)}>Edit</button>{' '}
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
