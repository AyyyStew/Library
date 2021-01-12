//utility functions
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

//https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
//this next snippet adds a method to produce a hash from a string. more specifically java's hashcode algorithm.
//we are using this to get a consistent numerical representation of a string.
function getHashCode(str) {
    var hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};


//actual project
//constructor function
function Book(title, author, pages, isRead){
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.getBookHash = function(){
    //this funciton below is defined outside of the object. probably needs to find a way to
    //include in the object or make said function a module
    return getHashCode(this.title + this.author + String(this.pages))
}

//book collection
let myLibrary = {};
function addBookToLibary(book){
    //this is used to tie book to library object.
    //also used to make sure book doesn't exist in library already
    let id = book.getBookHash()

    if (myLibrary[id] !== undefined){
        console.log(myLibrary[id])
        alert("This book already exists. Please edit existing book.")
        return false
    }

    myLibrary[id] = book
    return true

}

function createBookForm(title="", author="", pages="", completed=false){
    const addBookForm = htmlToElement(
        `<div class="bookCard-wrapper">
            <form class="addBook-form" autocomplete="off">
                <label id="title-label" for="title">Title</label>
                <input required id="title" type="text" value="${title}" placeholder="Title">

                
                <label id="author-label" for="author">Author</label>
                <input required id="author" type="text" value="${author}" placeholder="Author">

                <label id="pages-label" for="completed">Pages</label>
                <input required id="pages" type="number" value="${pages}" placeholder="Pages">

                <div id="completed-wrapper">
                    <label id="completed-label" for="completed">Completed?</label>
                    <input required id="completed" ${completed? "checked" : ""} type="checkbox" placeholder="Completed">
                </div>

                <div id="addBook">
                    <img class="add" src="images/add_circle_outline-24px.svg">
                    <img class="cancel" src="images/highlight_off-24px.svg">
                </div>
            </form> 
        </div>`)



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
        let newBook = new Book(...values)
        if (addBookToLibary(newBook)){
            addBookForm.replaceWith(createBookCard(newBook))
        }

        addBookForm.remove()
    })

    addBookForm.getElementsByClassName("cancel")[0].addEventListener('click', ()=>{
        if (confirm("Cancel book entry?")){
            if (title !== ""){
                addBookForm.replaceWith(createBookCard(new Book(title, author, pages, completed)))
            }else{
                addBookForm.remove()
            }
        }
    })

    return addBookForm
}

const addBookButton = document.getElementById("addBookButton")
addBookButton.addEventListener('click', ()=>{
    //add book form to the page
    addBookButton.insertAdjacentElement('afterend', createBookForm())
})

function hueShiftBook(book, title){
    //this is to convert that hash to a number between 0 and 360 
    const intToHueShift = function(int) {
        var shortened = int % 360;
        return shortened;
    };
    
    const hueShift = intToHueShift(getHashCode(title))
    // console.log(hueShift)
    book.setAttribute("style", `filter:hue-rotate(${hueShift}deg)`)
    

    //this is to de hueshift the contents of the book
    for (let contents of book.children){
        contents.setAttribute("style", `filter:hue-rotate(${-hueShift}deg)`)
    }
}


function createBookCard(book){
    const bookshelf = document.getElementById("bookshelf")
    let newBook = htmlToElement(`
            <div class="bookCard-wrapper">
                <div class="bookCard">    
                    <h2>${book.title}</h2>
                    <h3>${book.author}</h3>
                    <p>${book.pages}</p>
                    <p>${book.isRead ? "Completed" : "Incomplete"}</p>
                    <div class="editBookButtons">
                        <img class="edit" src="images/create-24px.svg">
                        <img class="delete" src="images/delete-24px.svg">    
                    </div>
                </div>
            </div>`)
    
    hueShiftBook(newBook, book.title)

    newBook.getElementsByClassName("delete")[0].addEventListener("click", ()=>{
        if(confirm("Delete Book?")){
            delete myLibrary[book.getBookHash()]
            bookshelf.removeChild(newBook)
        }
    })

    newBook.getElementsByClassName("edit")[0].addEventListener("click", ()=>{
        delete myLibrary[book.getBookHash()]
        const editBookForm = createBookForm(book.title, book.author, book.pages, book.isRead)
        bookshelf.replaceChild(editBookForm, newBook)
    })

    return newBook
}

function displayLibrary(){
    for (let id in myLibrary){
        addBookButton.insertAdjacentElement('afterend', createBookCard(myLibrary[id]))
    }
}


for (let i = 0; i<10; i++){
    addBookToLibary(new Book("a", "a", i, false))
}

displayLibrary()
