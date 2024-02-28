import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Checkbox, IconButton } from '@mui/material';
import "../App.css"
const TodoApp = () => {
    const savedItems = JSON.parse(localStorage.getItem('todos')) || [];
    const [items, setItems] = useState(savedItems);
    const [newItem, setNewItem] = useState('');

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            const updatedItems = [...items, { text: newItem, completed: false }];
            setItems(updatedItems);
            localStorage.setItem('todos', JSON.stringify(updatedItems));
            setNewItem('');
        }
    };

    const handleToggleItem = (index) => {
        const updatedItems = [...items];
        updatedItems[index].completed = !updatedItems[index].completed;
        setItems(updatedItems);
        localStorage.setItem('todos', JSON.stringify(updatedItems));
    };

    const handleDeleteItem = (index) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        localStorage.setItem('todos', JSON.stringify(updatedItems));
    };

    return (
    <>
        <div className='d-flex dggdgdg' >
          <h1>Todo App Page</h1>
            <TextField
                label="Add Todo"
                variant="outlined"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleAddItem}>
                Add
            </Button>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index} dense>
                        <Checkbox
                            checked={item.completed}
                            onChange={() => handleToggleItem(index)}
                        />
                        <div style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                            {item.text}
                        </div>
                        <IconButton onClick={() => handleDeleteItem(index)}>
                            <span role="img" aria-label="Delete">
                                ❌
                            </span>
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    </>
    );
};

export default TodoApp;
