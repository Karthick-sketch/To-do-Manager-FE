import React from 'react';
import axios from 'axios';
import './Todo.css';
import { Link } from 'react-router-dom';

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

  return <ul className="TodoItem">{listItems}</ul>;
}

function TodoCategory(props) {
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
      <p className="TodoSectionTitle-remainingCount">{completedTodosCount()} / {props.data.length}</p>
    </div>
    <TodoItems getRequest={props.getRequest} data={props.data} value={props.value}/>
  </section>;
}

class AddTodoForm extends React.Component {
  state = { todo_text: "", due_date: "" }

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
    return <div className="AddTodo">
      <input type="text" className="AddTodo-text" placeholder="What's next?" onChange={this.handleTodoText} autoComplete="off" autoFocus/>
      <input type="date" className="AddTodo-date" onChange={this.handleDueDate}/>
      <button className="AddTodo-button" onClick={this.handleSubmit}>Add</button>
    </div>;
  }
}

class Todo extends React.Component {
  today = (new Date().toISOString()).slice(0, 10);
  state = { overdue: [], due_today: [], due_later: [] }

  constructor() {
    super();
    this.getTodos();
  }

  getTodos = async () => {
    try {
      let data = await api.get("todos").then(({data}) => data);
      this.setState({
        overdue: data.filter(todo => todo.due_date < this.today),
        due_today: data.filter(todo => todo.due_date === this.today), 
        due_later: data.filter(todo => todo.due_date > this.today)
      })
    } catch(error) { console.log(error); }
  }

  render() {
    return (
      <article className="Todo-container">
        <div className="Todo-head">
          <h1>My To-do List</h1>
          <Link to="/signin" className="Signout-button">Sign out</Link>
        </div>
          <hr/>
        <div className="TodoPage-content">
          <AddTodoForm data={this.getTodos}/> <br/>
          <div>
            <TodoCategory getRequest={this.getTodos} data={this.state.overdue} name="Overdue" value={true}/>
            <TodoCategory getRequest={this.getTodos} data={this.state.due_today} name="Due Today" value={false}/>
            <TodoCategory getRequest={this.getTodos} data={this.state.due_later} name="Due Later" value={true}/>
          </div>
        </div>
      </article>
    );
  }
}

export default Todo;
