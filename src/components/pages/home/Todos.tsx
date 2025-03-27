import { FormEvent, useReducer, useState } from 'react';
import Todo from './Todo';

export const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_TODO: 'toggle_todo',
    DELETE_TODO: 'delete_todo',
}
  
const reducer = (todos:any, action:any) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)];
        case ACTIONS.TOGGLE_TODO:
            return todos.map((todo: any) => {
                if (todo.id === action.payload.id)
                    return { ...todo, complete: !todo.complete };
                return todo;
            })
        case ACTIONS.DELETE_TODO:
            return todos.filter((todo: any) => todo.id !== action.payload.id);
        default:
            return todos;
    }
}

const newTodo = (name: string) => {
    return { id: Date.now(), name: name, complete: false}
}

const Todos: React.FC = () => {
const [todos, dispatch] = useReducer(reducer, []);
const [name, setName] = useState('');

const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name} });
    setName('');
}

console.log(todos);
  return (
    <>
    <form onSubmit={submitHandler}>
        <input className='root__background-color' type="text" value={name} onChange={e => setName(e.target.value)} />
    </form>
    {todos.map((todo: any) => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch}></Todo>
    ))}
    </>
  )
}

export default Todos;