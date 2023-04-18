import React, { useEffect, useState } from 'react';
import service from './service.js';

function Todos(props) {
    const { setIsLogin } = props;
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);

    async function getTodos() {

        console.log("todos")
        const todos = await service.getTasks();
        setTodos(todos);
    }

    async function createTodo(e) {
        e.preventDefault();
        await service.addTask(newTodo);
        setNewTodo("");//clear input
        await getTodos();//refresh tasks list (in order to see the new one)
    }

    async function updateCompleted(todo, isComplete) {
        await service.setCompleted(todo.id, isComplete);
        await getTodos();//refresh tasks list (in order to see the updated one)
    }

    async function deleteTodo(id) {
        await service.deleteTask(id);
        await getTodos();//refresh tasks list
    }

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <section className="todoapp">
                {console.log("hi")}
                <header className="header">
                    <h1>todos</h1>
                    <form onSubmit={createTodo}>
                        <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    </form>
                </header>
                <section className="main" style={{ display: "block" }}>
                    <ul className="todo-list">
                        {todos.map(todo => {
                            return (
                                <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                                    <div className="view">
                                        <input className="toggle" type="checkbox" defaultChecked={todo.isCompleted} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                                        <label>{todo.name}</label>
                                        <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>

            </section >
            <button onClick={() => { localStorage.removeItem("access_token"); setIsLogin(false) }} >log out</button>
        </>
    );

}
export default Todos