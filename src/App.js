import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Myreads from './Myreads'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      // console.log('books: ',books)
    })
  }

  changeShelfMyreads = (book, shelf) => {
    BooksAPI.update(book, shelf).then(a => {
      let books = this.state.books
      books[books.indexOf(book)].shelf = shelf
      this.setState({ books })
    })
  }

  changeShelfSearch = (book, shelf) => {
    BooksAPI.update(book, shelf).then(a => {
      // console.log('changeShelfSearch Done')
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
        // console.log('books: ',books)
      })
    })
  }

  render() {
    let books = this.state.books
    return (
      <div className="app">
        <Route exact path="/" render={({history}) => (
          <Myreads books={books} changeShelf={this.changeShelfMyreads}/>
        )}/>
        <Route path='/search' render={() => (
          <SearchPage changeShelf={this.changeShelfSearch}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
