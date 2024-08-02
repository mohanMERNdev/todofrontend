// src/components/Login.js
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      redirectToTodos: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://todobackend-27q6.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      this.setState({ redirectToTodos: true });
    } catch (error) {
      console.error('Login error:', error.message);
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.state.redirectToTodos) {
      return <Navigate to="/todos" />;
    }

    return (
      <div className = "card">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
        <p>New user? <a href="/register">Register here</a></p>
      </div>
    );
  }
}

export default Login;
