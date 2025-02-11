import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Todo.css';

function Todo() {
    const [todos, setTodos] = useState([]); // Initialize as empty array
    const [inputValue, setInputValue] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/todos")
            .then(response => {
                setTodos(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("Error fetching todos:", error));
    }, []);


    const handleOpenInput = () => {
        setIsInputVisible(true);
    };

    const handleCloseInput = () => {
        setIsInputVisible(false);
        setInputValue('');
        setEditIndex(null);
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/todos', { text: inputValue }); // Send to backend
                setTodos(response.data); // Update with the new list from the server
                handleCloseInput();
            } catch (error) {
                console.error("Error adding todo:", error);
            }
        }
    };

    const handleUpdateTodo = async (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            try {
                const response = await axios.put(`http://127.0.0.1:5000/api/todos/${editIndex}`, { text: inputValue }); // Send update to backend
                console.log(response);
                setTodos(response.data);
                handleCloseInput();
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        }
    };

    const handleDeleteTodo = async (deleteIndex) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/todos/${deleteIndex}`);
            console.log(response);
            setTodos(response.data);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const handleEditTodo = (_id, text) => {
        setInputValue(text);
        setIsInputVisible(true);
        setEditIndex(_id);
    };

    return (
        <div className="container">
            <h1 className="todo">TO-DO</h1>
            <i className="fa-solid fa-plus" id="add_icon" onClick={handleOpenInput}></i>

            <div className={`overlay ${isInputVisible ? 'active' : ''}`}></div> {/* Overlay */}

            {isInputVisible && (
                <form id="todo_inp" onSubmit={editIndex === null ? handleAddTodo : handleUpdateTodo} onReset={handleCloseInput}>
                    <input
                        type="text"
                        placeholder="Add Tasks"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required // Add required attribute
                    />
                    <button id="add_inp_btn" type="submit"> {/* Add type="submit" */}
                        {editIndex === null ? 'Add' : 'Update'}
                    </button>
                    <button id="cancel_inp" type="reset" style={{ backgroundColor: 'red' }}> {/* Add type="reset" */}
                        Cancel
                    </button>
                </form>
            )}

            <div className="todo_list">
                {todos.map((todo, index) => (
                    <div className="todo_items" key={`${todo._id}-${todo.text}`}>
                        <div className="todo_num">{index + 1}</div>
                        <p>{todo.text}</p>
                        <i
                            className="fa-regular fa-pen-to-square edit_icon"
                            onClick={() => handleEditTodo(todo._id, todo.text)}
                        ></i>
                        <i
                            className="fa-regular fa-trash-can del_icon"
                            onClick={() => handleDeleteTodo(todo._id)}
                        ></i>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Todo;