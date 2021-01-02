//utility functions
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}


//actual project
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
    myLibrary.forEach(book => { 
        bookshelf.appendChild(
            htmlToElement(`
                <div class="bookCard-wrapper">
                    <div class="bookCard">    
                        <h2>${book.title}</h2>
                        <h3>${book.author}</h3>
                        <p>${book.pages}</p>
                        <p>${book.isRead ? "Completed" : "Incomplete"}</p>
                    </div>
                </div>`
            )
        )
    })
}


for (let i = 0; i<10;i++){
    addBookToLibary(new Book("Man and His Symbols", "Carl Jung", 300, true))
}
displayBooks()


function hueShiftBooks(){
    const books = document.getElementById("bookshelf").children
    for(let book of books){
        console.log(book)
        //hueshift the div containing the book background image
        const hueShift = Math.floor(Math.random() *360) //random int from 0 to 360
        book.setAttribute("style", `filter:hue-rotate(${hueShift}deg)`)
        
        //this is to de hueshift the contents of the book
        for (let contents of book.children){
            contents.setAttribute("style", `filter:hue-rotate(${-hueShift}deg)`)
        }

        console.log(book)
    }
}

hueShiftBooks()