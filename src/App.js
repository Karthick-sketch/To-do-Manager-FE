import React from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({ baseURL: "http://localhost:8080/" });

function TodoItems(props) {
  async function handleDelete(id) {
    const data = await api.delete(`todo/${id}`);
    if (data.status === 200) {
      props.getRequest();
    }
  }

  function isNotToday(due_date) {
    return (props.value ? <p className="TodoItem-dueDate">{due_date}</p> : null);
  }

  const arr = props.data;
  const listItems = arr.map(todo =>
    <li key={todo.id}>
      <label className="TodoItem-container">
        <div>
          <form action={String(todo.id)}>
            <input type="checkbox" name="completed" className="TodoItem-checkbox"/>
          </form>
          <p>{todo.todo_text}</p>
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
      let res = await api.post("todo", this.state);
      if (res.status === 200) {
        this.props.data();
        document.getElementsByClassName('AddTodo-text')[0].value = "";
        document.getElementsByClassName('AddTodo-date')[0].value = "";
      }
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

class App extends React.Component {
  date = new Date();
  today = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + this.date.getDate();
  state = { overdue: [], due_today: [], due_later: [] }

  constructor() {
    super();
    this.getTodos();
  }

  getTodos = async () => {
    let data = await api.get("todos").then(({data}) => data);
    this.setState({
      overdue: data.filter(todo => todo.due_date < this.today),
      due_today: data.filter(todo => todo.due_date === this.today), 
      due_later: data.filter(todo => todo.due_date > this.today)
    })
  }

  render() {
    return <div className="TodoPage-content">
      <AddTodoForm data={this.getTodos}/> <br/>
      <div>
        <TodoCategory getRequest={this.getTodos} data={this.state.overdue} name="Overdue" value={true}/>
        <TodoCategory getRequest={this.getTodos} data={this.state.due_today} name="Due Today" value={false}/>
        <TodoCategory getRequest={this.getTodos} data={this.state.due_later} name="Due Later" value={true}/>
      </div>
    </div>;
  }
}

export default App;
