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
        // console.log(book)
        //hueshift the div containing the book background image
        const hueShift = Math.floor(Math.random() *360) //random int from 0 to 360
        book.setAttribute("style", `filter:hue-rotate(${hueShift}deg)`)
        
        //this is to de hueshift the contents of the book
        for (let contents of book.children){
            contents.setAttribute("style", `filter:hue-rotate(${-hueShift}deg)`)
        }

        // console.log(book)
    }
}

const addBookButton = document.getElementById("addBookButton")
addBookButton.addEventListener('click', ()=>{
    const addBookForm = htmlToElement(
        `<div class="bookCard-wrapper">
            <form class="addBook-form" autocomplete="off">
                <label id="title-label" for="title">Title</label>
                <input required id="title" type="text" placeholder="Title">

                
                <label id="author-label" for="author">Author</label>
                <input required id="author" type="text" placeholder="Author">

                <label id="pages-label" for="completed">Pages</label>
                <input required id="pages" type="number" placeholder="Pages">

                <div id="completed-wrapper">
                    <label id="completed-label" for="completed">Completed?</label>
                    <input required id="completed" type="checkbox" placeholder="Completed">
                </div>

                <div id="addBook">
                    <img class="add" src="images/add_circle_outline-24px.svg">
                    <img class="cancel" src="images/highlight_off-24px.svg">
                </div>
            </form> 
        </div>`)


    //add book form to the page
    addBookButton.insertAdjacentElement('afterend', addBookForm)

    //add button submisison
    addBookForm.getElementsByClassName("add")[0].addEventListener('click', ()=>{

        //form validation and parameterization
        const form = addBookForm.getElementsByClassName("addBook-form")[0]
        let values = []
        for(field of form){
            if (field.type === "checkbox"){
                //get the checkbox value
                values.push(field.checked)
            } else {
                //make sure somethign is entered in all fields and that numbers are entered for pages
                if (field.value === ""){
                    if (field.type === "number") return alert("Not a valid number of pages.")
                    else return alert("Please enter all fields.")
                }
                
                values.push(field.value)
            } 
        }

        //add new book to library
        addBookToLibary(new Book(...values))
    })




})

hueShiftBooks()