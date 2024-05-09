// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [error, setError] = useState(false); // Changed error state to boolean

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const handleSubmit = () => {
        if(inputValue.trim()===''){
            setError(true); // Set error to true if inputValue is empty
        } else if (todos.some(todo => new RegExp(`^${inputValue}$`, 'i').test(todo))) {
            setError(true); // Set error to true if inputValue already exists
        } else {
            setTodos([...todos, inputValue]);
            setInputValue('');
            setError(false); // Reset error state
        }
    };

    const handleEditSubmit = () => {
        if (editValue.trim() !== '') {
            const updatedTodos = [...todos];
            updatedTodos[editIndex] = editValue;
            setTodos(updatedTodos);
            setEditIndex(null);
            setEditValue('');
        }
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
            {error && <p>Same or vacant  .</p>} {/* Display error message based on error state */}
            <ul>
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
