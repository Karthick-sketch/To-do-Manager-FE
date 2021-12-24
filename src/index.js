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

  function checked(todo) {
    if (todo.completed) {
      return <input type="checkbox" name="completed" className="TodoItem-checkbox" onClick="this.form.submit()" checked/>;
    } else {
      return <input type="checkbox" name="completed" className="TodoItem-checkbox" onClick="this.form.submit()"/>;
    }
  }

  function strickoutText(todo) {
    if (todo.completed) {
      return <p className="TodoItem-text">{todo.todo_text}</p>
    } else {
      return <p>{todo.todo_text}</p>
    }
  }

  const listItems = arr.map(todo =>
    <li key={todo.id} className="TodoItem-container">
      <div>
        <form action={"#/" + String(todo.id)}>{checked(todo)}</form>
        {strickoutText(todo)}
        <p className="TodoItem-dueDate">{todo.due_date}</p>
      </div>
      <form action="#">
        <button className="TodoItem-delete">
          <img src="trashcan.png" alt="Delete todo"/>
        </button>
      </form>
    </li>
  );

  return <ul className="TodoItem">{listItems}</ul>;
}

function TodoCategory(props) {
  const [todos, setTodos] = useState(props.data);

  function completedTodosCount() {
    let count = 0;
    for (let i of props.data) {
      if (i.completed) count++;
    }

    return count;
  }

  return <section className="TodoSection">
    <div className="TodoSectionTitle">
      <h4 className="TodoSectionTitle-text">{props.name}</h4>
      <p className="TodoSectionTitle-remainingCount">{completedTodosCount()} / {todos.length}</p>
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
  {id: 1, todo_text: "Buy movie ticket", due_date: "2021-12-24", completed: true},
  {id: 2, todo_text: "Wash clothes", due_date: "2021-12-24", completed: false},
  {id: 3, todo_text: "Watch No Way Home", due_date: "2021-12-24", completed: true}
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
