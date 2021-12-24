import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

function AddTodoForm() {
  return <form action="#">
    <div>
      <input name="todo-text" className="AddTodo-text" placeholder="What's next?" autoComplete="off" /> {/* autoFocus */}
      <input type="date" name="due_date" className="AddTodo-date"/>
      <button type="submit" className="AddTodo-button">Add</button>
    </div>
  </form>;
}

function TodoItems(props) {
  const arr = props.data;
  const listItems = arr.map(todo =>
  <li key={todo.id} className="TodoItem-container">
    <div>
      <form action={"#/" + String(todo.id)}>
        <input type="checkbox" name="completed" value={todo.completed} className="TodoItem-checkbox" onClick="this.form.submit()"/>
      </form>
      <p {...todo.completed ? "class=TodoItem-text" : ""}>{todo.todo_text}</p>
      <p className="TodoItem-dueDate">{todo.due_date}</p>
    </div>
    <form action="#" method="delete">
      <button className="TodoItem-delete">
        <img src="trashcan.png" alt="Delete todo"/>
      </button>
    </form>
  </li>);
  return <ul className="TodoItem">{listItems}</ul>;
}

function TodoCategory(props) {
  const [todos, setTodos] = useState(props.data);

  function isNotToday() {
    return (
      (!props.value) ? <p className="TodoSectionTitle-remainingCount">{todos.length}</p> : null
    );
  }

  return <section className="TodoSection">
    <div className="TodoSectionTitle">
      <h4 className="TodoSectionTitle-text">{props.name}</h4>
      {isNotToday}
    </div>
    <TodoItems data={todos}/>
  </section>;
}

function TodoSections(props) {
  const date = new Date();
  const today = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
  const [overdue, setOverdue] = useState(props.data.filter(todo => todo.due_date < today));
  const [due_today, setDueToday] = useState(props.data.filter(todo => todo.due_date === today));
  const [due_later, setDueLater] = useState(props.data.filter(todo => todo.due_date > today));

  return <div>
    <TodoCategory data={overdue} name="Overdue" value={true}/>
    <TodoCategory data={due_today} name="Due Today" value={false}/>
    <TodoCategory data={due_later} name="Due Later" value={true}/>
  </div>;
}

const Todos = [
  {id: 1, todo_text: "Buy movie ticket", due_date: "2021-12-25", completed: false},
  {id: 2, todo_text: "Wash clothes", due_date: "2021-12-25", completed: false},
  {id: 3, todo_text: "Watch No Way Home", due_date: "2021-12-25", completed: false}
]

ReactDOM.render(
  <article className="Todo-container">
	  <h1>My To-do List</h1>
    <div className="TodoPage-content"><AddTodoForm/> <br/> <TodoSections data={Todos}/></div>
  </article>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
