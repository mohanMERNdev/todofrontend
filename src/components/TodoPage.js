import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection
import './TodoPage.css'; // Import your CSS file

class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      redirectToLogin: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ redirectToLogin: true });
    } else {
      this.fetchTodos();
    }
  }

  fetchTodos = () => {
    const token = localStorage.getItem('token');
    fetch('https://todobackend-27q6.onrender.com/api/todos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.setState({ todos: data }))
      .catch(error => console.error('Error fetching todos:', error));
  };

  handleChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('https://todobackend-27q6.onrender.com/api/todos', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: this.state.newTodo })
    })
      .then(response => {
        if (response.ok) {
          this.fetchTodos();
          this.setState({ newTodo: '' });
        } else {
          throw new Error('Failed to add todo');
        }
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  handleDeleteTodo = (id) => {
    const token = localStorage.getItem('token');
    fetch(`https://todobackend-27q6.onrender.com/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          this.fetchTodos();
        } else {
          throw new Error('Failed to delete todo');
        }
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />; 
    }

    return (
      <div className="card">
        <h2>Todo List</h2>
        <form onSubmit={this.handleAddTodo}>
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleChange}
            placeholder="New todo"
            required
          />
          <button type="submit">Add Todo</button>
        </form>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo._id}>
              <span className="todo-text">{todo.text}</span>
              <div>
                <button className="edit-button">Edit</button>
                <button className="delete-button" onClick={() => this.handleDeleteTodo(todo._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoPage;
