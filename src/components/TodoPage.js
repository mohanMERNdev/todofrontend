
import React, { Component } from 'react';
import './TodoPage.css';

class TodoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],     
      newTodo: '',
      token: localStorage.getItem('token') || '', 
    };
  }

  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    try {
      const response = await fetch('https://todobackend-27q6.onrender.com/api/todos', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState({ todos: data });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAddTodo = async () => {
    try {
      const response = await fetch('https://todobackend-27q6.onrender.com/api/todos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: this.state.newTodo })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState(prevState => ({
        todos: [...prevState.todos, data],
        newTodo: ''
      }));
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`https://todobackend-27q6.onrender.com/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.setState(prevState => ({
        todos: prevState.todos.filter(todo => todo._id !== id)
      }));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  handleUpdateTodo = async (id, text) => {
    try {
      const response = await fetch(`https://todobackend-27q6.onrender.com/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => (todo._id === id ? data : todo))
      }));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  render() {
    return (
      <div>
        <h1>Todo Page</h1>
        <input
          type="text"
          value={this.state.newTodo}
          onChange={this.handleInputChange}
          placeholder="Add a new todo"
        />
        <button onClick={this.handleAddTodo}>Add Todo</button>
        <ul>
          {this.state.todos && this.state.todos.length > 0 ? (
            this.state.todos.map(todo => (
              <li key={todo._id}>
                <span className="todo-text">{todo.text}</span>
                <button className="edit-button" onClick={() => this.handleUpdateTodo(todo._id, prompt('New text:', todo.text))}>Edit</button>
                <button className="delete-button" onClick={() => this.handleDeleteTodo(todo._id)}>Delete</button>
              </li>
            ))
          ) : (
            <p>No todos found.</p>
          )}
        </ul>
      </div>
    );
  }
}

export default TodoPage;
