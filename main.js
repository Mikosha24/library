let library = []; // contains the book objects

class Book {
  id = crypto.randomUUID();

  constructor(title, author, numOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
  }

  bookInfo() {
    console.log(`Title: ${this.title}, Author: ${this.author}, 
        ${this.title} is ${this.numOfPages} pages long.`);
  }
}

Book.prototype.toggleReadStatus = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, numOfPages, isRead) {
  let book = new Book(title, author, numOfPages, isRead);
  library.push(book);
}

function displayBooks(library) {
  let lib2 = library;
  let libraryElem = document.querySelector("#lib");

  libraryElem.replaceChildren();

  for (let book of lib2) {
    let bookElem = document.createElement("div");
    bookElem.setAttribute("class", "book");
    bookElem.setAttribute("data-index-number", `${book.id}`);

    let titleElem = document.createElement("h1");
    titleElem.setAttribute("class", "title");

    let authorElem = document.createElement("p");
    authorElem.setAttribute("class", "author");

    let numOfPagesElem = document.createElement("p");
    numOfPagesElem.setAttribute("class", "numOfPages");

    let isReadElem = document.createElement("input");
    isReadElem.setAttribute("type", "checkbox");
    if (book.isRead) {
      isReadElem.setAttribute("checked", "checked");
    }

    let label = document.createElement("label");
    label.textContent = "Read?";

    let removeBtn = document.createElement("button"); // Removes book element
    removeBtn.setAttribute("id", "removeBtn");

    removeBtn.addEventListener("click", () => {
      removeBtn.parentElement.remove();
      let bookId = removeBtn.parentElement.dataset.indexNumber;

      const index = library.findIndex((book) => book.id === bookId);

      if (index != -1) {
        library.splice(index, 1);
      }
      displayBooks(library);
    });

    let readButton = document.createElement("button");
    readButton.textContent = book.isRead ? "Mark as unread" : "Mark as read";
    readButton.type = "button";

    readButton.addEventListener("click", () => {
      book.toggleReadStatus();
      displayBooks(library);
    });

    titleElem.innerHTML = book.title;
    authorElem.innerHTML = book.author;
    numOfPagesElem.innerHTML = "Number of pages: " + book.numOfPages;
    removeBtn.innerHTML = "Remove";

    bookElem.appendChild(titleElem);
    bookElem.appendChild(authorElem);
    bookElem.appendChild(numOfPagesElem);
    bookElem.appendChild(isReadElem);
    bookElem.appendChild(label);
    bookElem.appendChild(removeBtn);
    bookElem.appendChild(readButton);

    libraryElem.appendChild(bookElem);
  }
}

// Showing and closing form for adding a new book

const bookDialog = document.querySelector("#book-dialog");
const openButton = document.querySelector("#open-book-dialog");
const closeButton = document.querySelector("#close-book-dialog");
const cancelButton = document.querySelector("#cancel-book-dialog");
const addBookButton = document.querySelector(".add-book-button");

openButton.addEventListener("click", () => {
  bookDialog.showModal();
});

closeButton.addEventListener("click", () => {
  bookDialog.close();
});

cancelButton.addEventListener("click", () => {
  bookDialog.close();
});

// Logic for adding the info

addBookButton.addEventListener("click", () => {
  let bookTitle = document.querySelector("#book-title").value;
  let author = document.querySelector("#book-author").value;
  let bookPages = document.querySelector("#book-pages").value;
  let bookStatus = document.querySelector("#book-status").value;

  bookStatus = bookStatus === "read" ? true : false;

  addBookToLibrary(bookTitle, author, bookPages, bookStatus);

  displayBooks(library);
  bookDialog.close();
});

// form validation

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const titleError = document.querySelector("#title-error");
const authorError = document.querySelector("#author-error");
const pagesError = document.querySelector("#pages-error");

function toggleError(input, spanError, message) {
  spanError.textContent = message;

  if (message === "") {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }
}

bookTitle.addEventListener("blur", checkTitle);

function checkTitle() {
  let message = "";
  if (bookTitle.validity.valueMissing) {
    message = "Book title can not be empty!!";
    toggleError(bookTitle, titleError, message);
  } else {
    toggleError(bookTitle, titleError, "");
  }
}

bookAuthor.addEventListener("blur", checkAuthor);

function checkAuthor() {
  let message = "";
  if (bookAuthor.validity.valueMissing) {
    message = "Book author can not be empty!!";
    toggleError(bookAuthor, authorError, message);
  } else {
    toggleError(bookAuthor, authorError, "");
  }
}

bookPages.addEventListener("blur", checkPages);

function checkPages() {
  let message = "";
  if (bookPages.validity.valueMissing) {
    message = "Book pages can not be empty!!";
    toggleError(bookPages, pagesError, message);
  } else {
    toggleError(bookPages, pagesError, "");
  }
}
