let library = []; // contains the book objects

function Book(title, author, numOfPages, isRead){
    
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();

  this.info = function(){
    console.log(`Title: ${this.title}, Author: ${this.author}, 
    ${this.title} is ${this.numOfPages} pages long.`);
  }
}

function addBookToLibrary(title, author, numOfPages, isRead){

    let book = new Book(title, author, numOfPages, isRead);
    library.push(book);
}

function displayBooks(library){
    let lib2 = library;
    let libraryElem = document.querySelector("#lib");

    for(let book of lib2){

        

        let bookElem = document.createElement("div");
        bookElem.setAttribute("class", "book");

        let titleElem = document.createElement("h1");
        titleElem.setAttribute("class", "title");

        let authorElem = document.createElement("p");
        authorElem.setAttribute("class", "author");

        let numOfPagesElem = document.createElement("p");
        numOfPagesElem.setAttribute("class", "numOfPages");

        let isReadElem = document.createElement("input");
        isReadElem.setAttribute("type", "checkbox");
        if(book.isRead){
            isReadElem.setAttribute("checked", "checked");
        }

        let label = document.createElement("label");
        label.textContent = "Read?";

        titleElem.innerHTML = book.title;
        authorElem.innerHTML = book.author;
        numOfPagesElem.innerHTML = "Number of pages: " + book.numOfPages;
        
        
        bookElem.appendChild(titleElem);
        bookElem.appendChild(authorElem);
        bookElem.appendChild(numOfPagesElem);
        bookElem.appendChild(isReadElem);
        bookElem.appendChild(label);

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

addBookButton.addEventListener("click", ()=>{
    let bookTitle = document.querySelector("#book-title").value;
    let author = document.querySelector("#book-author").value; 
    let bookPages = document.querySelector("#book-pages").value;
    let bookStatus = document.querySelector("#book-status").value;

    

    bookStatus = bookStatus === "read" ? true : false

    addBookToLibrary(bookTitle, author, bookPages, bookStatus);
    
    displayBooks(library);

    bookDialog.close();
    
})

