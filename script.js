const myLibrary = [];

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

//modal functions

const modal = document.querySelector('.modal'); //modal form in doc

const addButton = document.querySelector('#add');
const closeButton = document.querySelector('.close');

function pullDown() { //pulls down modal form when addBook button is pressed
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}
addButton.addEventListener('click', pullDown);
closeButton.addEventListener('click', pullDown);

//form functions

const formSubmit = document.querySelector('#addNew'); //SUBMIT FORM BUTTON

let nameInput = document.getElementById('bookname');
let authorInput = document.getElementById('author');
let pageInput = document.getElementById('pages');

formSubmit.addEventListener('click', function(){    //adds book to myLibrary array using form input values
    if(nameInput.value === '' || authorInput.value === '') {
        window.alert('Please fill in all fields before submitting book')
        return;
    } else {
        let name = nameInput.value;
        let author = authorInput.value;
        let pageNum = pageInput.value;
    
        let newBook = new Book(name, author, pageNum);
        myLibrary.push(newBook);
    
        checkLibrary(); //function adds book to grid element
        pullDown();

        nameInput.value = '';
        authorInput.value = '';
        pageInput.value = '';
    }
});


//grid elements

const gridElement = document.querySelector('.book-grid');

let readInput = document.getElementById('read');  //read status indicator

const notRead = document.createElement("span");
notRead.innerText = 'NOT READ';
notRead.classList.add('read-indicator');

function checkLibrary(){
    let newestBook = myLibrary[myLibrary.length - 1];

    const bookElement = document.createElement("div");
    bookElement.classList.add('book');

    const titleElement = document.createElement("h3");
    titleElement.innerText = `Title: ${newestBook.title}`;
    bookElement.appendChild(titleElement);

    const authorElement = document.createElement("span");
    authorElement.innerText = `Author: ${newestBook.author}`;
    bookElement.appendChild(authorElement);

    const pagesElement = document.createElement("span");
    pagesElement.innerText = `Pages: ${newestBook.pages}`;
    bookElement.appendChild(pagesElement);

    const removeIcon = document.createElement("img");
    removeIcon.setAttribute('src', 'icons/cancel_FILL0_wght400_GRAD0_opsz48.svg');
    removeIcon.classList.add('remove-button');
    bookElement.appendChild(removeIcon);

    removeIcon.addEventListener('click', function() {
        bookElement.style.display = 'none';
    });


    const readStatus = document.createElement('span');
    
    if(readInput.checked === true) {
        readStatus.innerText = 'READ';
        readStatus.classList.add('hasread');
        bookElement.appendChild(readStatus);
    } else {
        readStatus.innerText = 'NOT READ';
        readStatus.classList.add('hasnotread');
        bookElement.appendChild(readStatus);
    }

    readStatus.addEventListener('click', function(){
        if(readStatus.innerText === 'READ') {
            readStatus.innerText = 'NOT READ';
            readStatus.classList.remove('hasread');
            readStatus.classList.add('hasnotread');
        } else if(readStatus.innerText === 'NOT READ') {
            readStatus.innerText = 'READ';
            readStatus.classList.remove('hasnotread');
            readStatus.classList.add('hasread');
        }
    });

    gridElement.appendChild(bookElement);
}