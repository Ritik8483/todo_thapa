import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import '../styles/ToDo.css'
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ToDo = () => {
    const getToDoItems=()=>{
        const lists=window.localStorage.getItem('todoList');
        if(lists){
            return JSON.parse(lists);
        }
        else{
            return []
        }
    }
    const[todoText,setTodoText]=useState('');
    const[todoItems,setTodoItems]=useState(getToDoItems());
    const[editText,seteditText]=useState('');
    const[toggleIcon,setToggleIcon]=useState(false);

    useEffect(()=>{
        window.localStorage.setItem('todoList',JSON.stringify(todoItems));
    },[todoItems]);

    

    const submitToDo=(e)=>{
        e.preventDefault();
        console.log('Values',todoText);
    };
    

    const addToDo=()=>{
        if(!todoText){
            alert('Please enter any task')
        }
        else if(todoText && toggleIcon){
            setTodoItems(
                todoItems.map((item)=>{
                    if(item.id===editText){
                        return {
                            ...item,
                            name:todoText
                        }
                    }
                    return item;
                })
            )
            seteditText(null);
            setTodoText('');  
            setToggleIcon(false);
        }
        else{
            const newInputData={
                id:new Date().getTime().toString(),
                name:todoText
            }
            setTodoItems([...todoItems,newInputData]);
            setTodoText('');
            setToggleIcon(false);
            console.log('ID',newInputData)
        }
    }
    const handleDelete=(id)=>{
        const deletedItems=todoItems.filter((items)=>items.id!==id);
        setTodoItems(deletedItems);
    }
    const removeAll =()=>{
        setTodoItems([]);
    }
    const handleEdit=(id)=>{
        const item_edited=todoItems.find((currElement)=>{
            return currElement.id===id;
        })
        setTodoText(item_edited.name);
        seteditText(id);
        setToggleIcon(true);
    }
  return (
    <div>
        <div className='container'>
            <form onSubmit={submitToDo}>
            <input type='text' name='todo' value={todoText} onChange={(ev)=>setTodoText(ev.target.value)}  placeholder='Enter your task here' />
            <div className='addIcon' onClick={addToDo} tabIndex={0} role='button'>
                {toggleIcon?<EditIcon/>:<AddIcon className='add_icon' />}
            </div>
            </form>
            {
                todoItems.map((items)=>(
                    <div className='item_box' key={items.id}>
                        <span className='todotxt'>{items.name}</span>
                        <div className='icons'>
                            <div className='editIcon' onClick={()=>handleEdit(items.id)}>
                                <EditIcon/>
                            </div>
                            <div className='deleteIcon' onClick={()=>handleDelete(items.id)}>
                                <DeleteIcon/>
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className='btn'>
                <Button onClick={removeAll} type='submit' variant="contained" color="success">
                    Remove All
                </Button>
            </div>
        </div>
    </div>
  )
}

export default ToDo