console.log("this is index.js");

//constrcutor, where book is the object
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constrcutor for displaying books
function Display() {

}
//adding methods todisplay prototypes

//implementing the add function
Display.prototype.add = function (book) {
    console.log('ADDED');
    tableName = document.getElementById('tableName');
    let uiString = `
    <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
    </tr>
   `;
    tableName.innerHTML = tableName.innerHTML + uiString;
}


//implementing the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//implementing the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    } else {
        return true
    }
}
//implementing the show function
Display.prototype.show = function (type, displayMsg) {
    let message = document.getElementById('msg');
    message.innerHTML = `
    <div class="alert alert" role="alert">
    <strong>${type}, ${displayMsg}</strong> You should check in on some of those fields below.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    setTimeout(function () {
        message.innerHTML = ''
    }, 2000)
}

//add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit)

function libraryFormSubmit(e) {
    console.log("SUBMITTED THE FORM");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let Fiction = document.getElementById('Fiction');
    let Biography = document.getElementById('Biography');
    let Thriller = document.getElementById('Thriller');

    if (Fiction.checked) {
        type = Fiction.value;
    } else if (Biography.checked) {
        type = Biography.value;
    } else if (Thriller.checked) {
        type = Thriller.value;
    }
    let book = new Book(name, author, type) //creating new book object once the user submits the form
    console.log(book)

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('sucess', 'Book added succesfully');
    } else {
        // show error
        display.show('error', 'You cannot add the book');
    }
    console.log(display)
    e.preventDefault(); //to prevent the page fromreloading on clicking on submit

}