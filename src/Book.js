import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    onChangeShelf: PropTypes.func,
  }

  handleSelect = (event) => {
    event.preventDefault()
    if (this.props.onChangeShelf) {
      this.props.onChangeShelf(this.props.book, event.target.value)
    }
  }

  render() {
    if (this.props.book) {
      const book = this.props.book
      return (
        <li>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url({book.imageLinks.thumbnail})' }}></div>
              <div className="book-shelf-changer">
                <select onChange={this.handleSelect} value={book.shelf}>
                  <option value="none">Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead" >Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
      )
    }
    return null
  }
}

// function Book(props) {
//   handleSelect = (event) => {
//     event.preventDefault()
//     if (this.props.onChangeShelf) {
//       this.props.onChangeShelf(this.props.book, event.target.value)
//     }
//   }
//   if (props.book) {
//     const book = props.book
//     return (
//       <li>
//         <div className="book">
//           <div className="book-top">
//             <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: 'url({book.imageLinks.thumbnail})' }}></div>
//             <div className="book-shelf-changer">
//               <select onSelect={this.handleSelect}>
//                 <option value="none" disabled>Move to...</option>
//                 <option value="currentlyReading">Currently Reading</option>
//                 <option value="wantToRead">Want to Read</option>
//                 <option value="read">Read</option>
//                 <option value="none">None</option>
//               </select>
//             </div>
//           </div>
//           <div className="book-title">{book.title}</div>
//           <div className="book-authors">{book.authors}</div>
//         </div>
//       </li>
//     )
//   }
//   return null
// }
// Book.propTypes = {
//   book: PropTypes.object
// }
export default Book
