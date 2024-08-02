This is the frontend application for a Todo List application built using React with class components. The backend API is hosted on Render.

Usage
  1.Open your browser and navigate to http://localhost:3000.
  2.Register a new user or log in with an existing account.
  3.Add, edit, and delete todo items

Components
 Login.js
   Handles user login functionality. If the user is new, they can navigate to the register page.
   sample_date:
       username:user4,
       password:9999

 Register.js
   Handles user registration. After successful registration, the user is redirected to the login page.

 TodoPage.js
   Displays the todo list for the logged-in user. Users can add, edit, and delete todo items.

 App.js
    Main application component that sets up the routes for the application.

API Endpoints
   Register User: POST /api/users/register
   Login User: POST /api/users/login
   Get Todos: GET /api/todos
   Add Todo: POST /api/todos
   Edit Todo: PUT /api/todos/:id
   Delete Todo: DELETE /api/todos/:id
