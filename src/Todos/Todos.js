import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Todo.css';
import { Link, useNavigate } from 'react-router-dom';

const api = axios.create({ baseURL: "http://localhost:8080/" });

function TodoItems(props) {
  async function handleDelete(id) {
    try {
      const data = await api.delete(`todo/${id}`);
      if (data.status === 200) {
        props.getRequest();
      }
    } catch(error) { console.log(error); }
  }

  async function handleComplete(id) {
    try {
      const data = await api.patch(`todo/${id}`);
      if (data.status === 200) {
        props.getRequest();
      }
    } catch(error) { console.log(error); }
  }

  function isNotToday(due_date) {
    return (props.value ? <p className="TodoItem-dueDate">{due_date}</p> : null);
  }

  const arr = props.data;
  const listItems = arr.map(todo =>
    <li key={todo.id}>
      <label className="TodoItem-container">
        <div>
          <input type="checkbox" name="completed" className="TodoItem-checkbox" onChange={() => handleComplete(todo.id)} checked={todo.completed}/>
          <p style={{textDecoration : (todo.completed ? 'line-through' : 'none')}}>{todo.todo_text}</p>
          {isNotToday(todo.due_date)}
        </div>
        <button className="TodoItem-delete" onClick={() => handleDelete(todo.id)}>
          <img src="trashcan.png" alt="Delete todo"/>
        </button>
      </label>
    </li>
  );

  return (<ul className="TodoItem">{listItems}</ul>);
}

function TodoCategory(props) {
  function completedTodosCount() {
    let count = 0;
    for (let i of props.data) {
      if (i.completed) count++;
    }

    return count;
  }

  return (
    <section className="TodoSection">
      <div className="TodoSectionTitle">
        <h4 className="TodoSectionTitle-text">{props.name}</h4>
        <p className="TodoSectionTitle-remainingCount">{completedTodosCount()} / {props.data.length}</p>
      </div>
      <TodoItems getRequest={props.getRequest} data={props.data} value={props.value}/>
    </section>
  );
}

class AddTodoForm extends React.Component {
  state = { todo_text: "", due_date: "", user_id: localStorage.getItem("user_id") }

  handleSubmit = async () => {
    if (this.state.todo_text !== "" && this.state.due_date !== "") {
      try {
        let res = await api.post("todo", this.state);
        if (res.status === 200) {
          this.props.data();
          document.getElementsByClassName('AddTodo-text')[0].value = "";
          document.getElementsByClassName('AddTodo-date')[0].value = "";
        }
      } catch(error) { console.log(error); }
    }
  }

  handleTodoText = (e) => {
    this.setState({ todo_text: e.target.value });
    e.preventDefault();
  }

  handleDueDate = (e) => {
    this.setState({ due_date: e.target.value });
    e.preventDefault();
  }

  render() {
    return (
      <div className="AddTodo">
        <input type="text" className="AddTodo-text" placeholder="What's next?" onChange={this.handleTodoText} autoComplete="off" autoFocus/>
        <input type="date" className="AddTodo-date" onChange={this.handleDueDate}/>
        <button className="AddTodo-button" onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}

function Todo() {
  const navigate = useNavigate();

  const today = (new Date().toISOString()).slice(0, 10);
  const [overdue, setOverdue] = useState([]);
  const [due_today, setDueToday] = useState([]);
  const [due_later, setDueLater] = useState([]);

  function navigateTo(path) { navigate(path); }

  useEffect(() => {
    if (localStorage.getItem("user_id") != null) {
      if (getUser()) { getTodos(); }
      else { navigateTo("/signin"); }
    } else { navigateTo("/signin"); }
  }, []);

  async function getUser() {
    try {
      let user_id = localStorage.getItem("user_id");
      if (user_id !== null) {
        let data = await api.get(`user/${user_id}`).then((data) => data);
        if (data.name === localStorage.getItem("user_name")) {
          return true;
        }
      }
    } catch (error) { console.log(error); }
    return false;
  }

  async function getTodos() {
    try {
      let data = await api.get(`todos/${localStorage.getItem("user_id")}`).then(({data}) => data);
      setOverdue(data.filter(todo => todo.due_date < today));
      setDueToday(data.filter(todo => todo.due_date === today));
      setDueLater(data.filter(todo => todo.due_date > today));
    } catch(error) { console.log(error); }
  }

  function handleSignout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
  }

  return (
    <article className="Todo-container">
      <div className="Todo-head">
        <h1>{localStorage.getItem("user_name")}'s To-do List</h1>
        <Link to="/signin" onClick={handleSignout} className="Signout-button">Sign out</Link>
      </div>
        <hr/>
      <div className="TodoPage-content">
        <AddTodoForm data={getTodos}/> <br/>
        <div>
          <TodoCategory getRequest={getTodos} data={overdue} name="Overdue" value={true}/>
          <TodoCategory getRequest={getTodos} data={due_today} name="Due Today" value={false}/>
          <TodoCategory getRequest={getTodos} data={due_later} name="Due Later" value={true}/>
        </div>
      </div>
    </article>
  );
}

export default Todo;
