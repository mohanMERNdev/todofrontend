// src/components/Register.js
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      redirectToLogin: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://todobackend-27q6.onrender.com/api/users/register', {
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
        throw new Error('Registration failed');
      }

      this.setState({ redirectToLogin: true });
    } catch (error) {
      console.error('Registration error:', error.message);
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.state.redirectToLogin) {
      return <Navigate to="/login" />;
    }

    return (
      <div className='card'>
        <h2>Register</h2>
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
          <button type="submit">Register</button>
        </form>
        {this.state.error && <p>{this.state.error}</p>}
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    );
  }
}

export default Register;
