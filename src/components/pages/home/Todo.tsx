import React from 'react';
import { ACTIONS } from './Todos';

const Todo: React.FC<any> = ({todo, dispatch}: any) => {
    const toggleTodoHandler = () => {
        dispatch({ type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}});
    }
    const deleteTodoHandler = () => {
        return dispatch({ type: ACTIONS.DELETE_TODO, payload: {id: todo.id}});
    }
  return (
    <div>
        <span style={{color: todo.complete ? '#AAA' : '#000'}}>{todo.name}</span>
        <button type='button' onClick={toggleTodoHandler}>Toggle</button>
        <button type='button' onClick={deleteTodoHandler}>Delete</button>
    </div>
  )
}

export default Todo;