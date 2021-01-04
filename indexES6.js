console.log('ES6 version of index.js');

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log('ADDED');
        let tableName = document.getElementById('tableName');
        let uiString = `
         <tr>
             <td>${book.name}</td>
             <td>${book.author}</td>
             <td>${book.type}</td>
         </tr>
        `;
        tableName.innerHTML = tableName.innerHTML + uiString;
    }
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        } else {
            return true
        }
    }
    show(type, displayMsg) {
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
        display.show('success', 'Book added succesfully');
    } else {
        // show error
        display.show('error', 'You cannot add the book');
    }
    console.log(display)
    e.preventDefault(); //to prevent the page fromreloading on clicking on submit

}