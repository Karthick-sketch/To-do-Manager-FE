import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function AddTodoForm() {
  return <form action="#" className="AddTodo">
    <input name="todo-text" className="AddTodo-text" placeholder="What's next?" autoComplete="off" /> {/* autoFocus */}
    <input type="date" name="due_date" className="AddTodo-date"/>
    <button type="submit" className="AddTodo-button">Add</button>
  </form>;
}


const Todos = [
  {id: 1, todo_text: "Buy movie ticket", due_date: "2021-12-24", completed: false},
  {id: 2, todo_text: "Wash clothes", due_date: "2021-12-24", completed: false},
  {id: 3, todo_text: "Watch No Way Home", due_date: "2021-12-24", completed: false}
];

ReactDOM.render(
  <article className="Todo-container">
	  <h1>My To-do List</h1>
    <div className="TodoPage-content"><AddTodoForm/> <br/> <App data={Todos}/></div>
  </article>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
