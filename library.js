//constructor function
function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead 
}

//adds the function info to the book object
Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead? "completed":"not read yet"}`
}

//book collection
let myLibrary = [];
function addBookToLibary(book){
    myLibrary.push(book)
}

function displayBooks(){
    const bookshelf = document.getElementById("bookshelf")

    

    myLibrary.forEach(book => console.log(book.info()))
}
