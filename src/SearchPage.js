import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
// import debounce from './utils/debounce'
class SearchPage extends Component {
  state = {
    query: '',
    resultBooks: [],
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  handleChange = (query) => {
    // console.log('query is: ',query.trim())
    this.setState({query: query.trim()})
    // console.log(new Date())
    if(query.trim()){
      BooksAPI.search(query.trim()).then(((resultBooks) => {
        // console.log("search result: ", resultBooks)
        this.setState({
          resultBooks: resultBooks
        })
        // console.log("changeHandle done", new Date())
      }))
    }
    else{
      this.setState({resultBooks: []})
    }
  }
  render() {
    const changeShelf = this.props.changeShelf
    let resultBooks = this.state.resultBooks
    let books = this.state.books
    // console.log(resultBooks)
    for (let i = 0; i < books.length; i++){
      for (let j = 0; j < resultBooks.length; j++){
        if (books[i].title===resultBooks[j].title) {
          resultBooks[j].shelf = books[i].shelf
        }
      }
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search"
             to="/" >Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.handleChange(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {resultBooks.map((book) => (
              <Book key={book.id} book={book}
                onChangeShelf={(book, shelf) => {
                  changeShelf(book, shelf)
                }}/>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
