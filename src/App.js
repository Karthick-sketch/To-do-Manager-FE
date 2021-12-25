import { useState } from 'react';
import './App.css';
import React from 'react';


function TodoItems(props) {
  const [decoration, setDecoration] = useState("none");
  const arr = props.data;

  function handleChange(e) {
    setDecoration((e.target.checked ? "line-through" : "none"));
  }

  function isNotToday(todo) {
    return (props.value ? <p className="TodoItem-dueDate">{todo.due_date}</p> : null);
  }

  const listItems = arr.map(todo =>
    <li key={todo.id}>
      <label className="TodoItem-container">
        <div>
          <form action={"#/" + String(todo.id)}>
            <input type="checkbox" name="completed" className="TodoItem-checkbox" onClick={handleChange}/>
          </form>
          <p style={{textDecoration: decoration}}>{todo.todo_text}</p>
          {isNotToday(todo)}
        </div>
        <form action="#">
          <button className="TodoItem-delete">
            <img src="trashcan.png" alt="Delete todo"/>
          </button>
        </form>
      </label>
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
    <TodoItems data={todos} value={props.value}/>
  </section>;
}

function App(props) {
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

export default App;
