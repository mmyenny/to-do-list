import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [
        {
          id: 1,
          text: 'Learn HTML & CSS',
          complete: true
        },
        {
          id: 2,
          text: 'Master React',
          complete: false
        }
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>One List</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              return <></>
            })}
            <li className="completed">Review at 2</li>
            <li>Watch Videos</li>
            <li>Eat Dinner</li>
            <li>Code</li>
            <li>Sleep</li>
          </ul>
          <input type="text" placeholder="Whats up?" />
        </main>
        <footer>
          <p>
            <img src={logo} height="42" alt="logo" />
          </p>
          <p>&copy; 2018 Suncoast Developers Guild</p>
        </footer>
      </div>
    )
  }
}

export default App
