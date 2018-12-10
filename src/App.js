import React, { Component } from 'react'
import axios from 'axios'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      newToDoItem: ''
    }
  }

  componentDidMount = event => {
    axios
      .get('https://one-list-api.herokuapp.com/items?access_token=mmylist')
      .then(response => {
        this.setState({
          todos: response.data
        })
      })
  }

  newToDoItem = event => {
    // console.log(event.target.value)
    this.setState({
      newToDoItem: event.target.value
    })
  }

  createToDoList = event => {
    event.preventDefault()
    // console.log(this.state.newToDoItem)
    axios
      .post('https://one-list-api.herokuapp.com/items?access_token=mmylist', {
        item: {
          text: this.state.newToDoItem
        }
      })
      .then(response => {
        this.componentDidMount()
        this.setState({
          newToDoItem: ''
        })
      })
  }

  markItemComplete = event => {
    // everytime i make a new function
    // i think this:
    // - check to make sure the event and function are communicating
    // - check to make sure we can access the info need, if info is needed
    // console.log('clicked')

    // below console log.
    //target data- using dataset . name of data-
    //in this case: dataset.itemid
    // accessing id
    // console.log(event.target.dataset.itemid)

    axios
      .put(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.itemid
        }?access_token=mmylist`,
        {
          item: {
            complete: true
          }
        }
      )
      .then(response => {
        this.componentDidMount()
      })
  }

  deleteItem = event => {
    event.preventDefault()
    // console.log('clicked')
    axios
      .delete(
        `https://one-list-api.herokuapp.com/items/${
          event.target.dataset.itemid
        }?access_token=mmylist`
      )
      .then(response => {
        this.componentDidMount()
      })
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>To Do Today:</h1>
        </header>
        <main>
          <ul className="one-list">
            {this.state.todos.map((todo, index) => {
              return (
                <li
                  //same as this:
                  // if (todo.complete === true) {
                  //   ‘completed’
                  // } else {
                  //   ‘’
                  // }
                  // called a ternary operator
                  //below the left side is true, right side is false
                  className={todo.complete ? 'completed' : ''}
                  onClick={this.markItemComplete}
                  onContextMenu={this.deleteItem}
                  //use data- to pass info, in this case id
                  data-itemid={todo.id}
                  key={index}
                >
                  {todo.text}
                </li>
              )
            })}
          </ul>
          <form onSubmit={this.createToDoList}>
            <input
              type="text"
              placeholder="Todays goals..."
              onChange={this.newToDoItem}
              value={this.state.newToDoItem}
            />
          </form>
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
