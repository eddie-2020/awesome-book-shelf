// Book Class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class
class UI {
  static displayBooks() {

    const books = storeBooks.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book_list");

    const item = document.createElement("p");

    item.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.isbn}</p>
        <p><button  class ="delete">Remove</button></p>
      `;

    list.appendChild(item);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Store Class
class StoreList {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = StoreList.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = StoreList.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event To Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event To Add a Book
document.querySelector("#bookForm").addEventListener("submit", (e) => {
  // Prevent default submit
  e.preventDefault();

  // To Get Form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  //if (title === "" || author === "" || isbn === "") {
  //alert("Please fill in all fields");
  //}

  // Initiating books
  const book = new Book(title, author, isbn);

  // Add Book to UI
  UI.addBookToList(book);

  // Add books to store
  StoreList.addBook(book);

  // Clear Fields
  UI.clearFields();
});

// Event To Remove a Book
document.querySelector("#book_list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
