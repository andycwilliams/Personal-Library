const searchInputEl = document.getElementById('bookInput');
const submitBtn = document.getElementById('submitButton');
const titleEl = document.getElementById('resultsTitle');
const authorEl = document.getElementById('resultsAuthor');
const genreEl = document.getElementById('resultsGenre');
const descriptionEl = document.getElementById('resultsDescrip');
const bookImgEl = document.getElementById('resultsImg');
const libraryArr = [];

// document.body.append(titleEl);
// document.body.append(authorEl);
// document.body.append(genreEl);
// document.body.append(descriptionEl);
// document.body.append(bookImgEl);

// console.log(libraryArr.length);

// console.log("Test");

function setArrayToLocalStorage (){
    // console.log(libraryArr);
    if (libraryArr.length = 0){
        console.log("Array is empty")
    }else{
        return localStorage.getItem("bookStorage");
    }
};

setArrayToLocalStorage();

// Searches the api using user's query and gives top 10 results
function getAPI(bookSearch) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            // console.log(data.items)
            handleData(data)
        });
};

submitBtn.addEventListener('click', handleClick)
function handleClick() {
    const userQuery = searchInputEl.value;
    getAPI(userQuery);
};

// Handles the parameters of title/author/genre/description/bookimg
function handleData(data){
        let bookResultsTable = document.getElementById('book-search-results');
        const bookInfo = data.items;
        function buildRow(book){
            const shortDescription = book.volumeInfo.description?.split('.')[0];
            let trEl = document.createElement('tr');
            trEl.classList.add('book-info-row');
            buildTdWithInfo(book.volumeInfo.title, trEl); 
            buildTdWithInfo(book.volumeInfo.authors, trEl);
            buildTdWithInfo(book.volumeInfo.categories, trEl);
            buildTdWithInfo(shortDescription, trEl);
            buildTdWithInfo(book.volumeInfo.imageLinks.thumbnail, trEl, true);
            bookResultsTable.append(trEl);
        }
        for (let i = 0; i < bookInfo.length; i++) {
            buildRow(bookInfo[i]);
        }
};

function buildTdWithInfo(info, trEl, isImage) {
    const tdEl = document.createElement('td');
    tdEl.classList.add('book-td');
    if (!info) {
        tdEl.textContent = 'No info listed.'
    } else if (!isImage) {
        // console.log('info is: ', info);
        tdEl.textContent = info;
    } else {
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', info);
        tdEl.append(imgEl);
    }
    trEl.append(tdEl);
};

//  Could be function to add book to personal library----->
const bookSelection = document.querySelector('#book-search-results');
bookSelection.addEventListener('click', handleClickSelection);

function handleClickSelection(event) {
    const el = event.target;
    if(el.tagName === 'TD'){
        console.log('yay')
        const bookRow = el.parentElement;
        console.log()
        saveBook(bookRow);
    } else {
        console.log('no')
        console.log(el)
    }
};

// --------------------------- Add to local storage ---------------------------

// const searchArr = [];

// function searchBooks() {
//     const searchVal = document.getElementById("bookInput").value;
//     searchArr.push(searchVal);
//     localStorage.setItem("searchStorage", searchArr);
//     savedBooks();
//     updateHTML();
// };

function saveBook() {
    const bookInputVal = document.getElementById("bookInput").value;
    libraryArr.push(bookInputVal);
    localStorage.setItem("bookStorage", libraryArr);
    savedBooks();
    updateHTML();
};

function savedBooks() {
    const addedBook = document.createElement("p")
    const totalLibrary = localStorage.getItem("bookStorage");
    document.getElementById("userLibrary").innerHTML = `${totalLibrary}`;
    addedBook.textContent = `${totalLibrary}`;
};

// function savedBooks() {
//     const savedBookEl = document.getElementById("bookLibrary");
//     const postLibraryArr = libraryArr.join(`, `);
//     savedBookEl.textContent = `${postLibraryArr}`;
// };

function updateHTML() {
    const bookEl = getBook();
    // // console.log(bookEl);
    // while (bookEl.firstChild) {
    //     bookEl.removeChild(bookEl.firstChild)
    // };
    document.getElementById("submitReturn").innerHTML = "TEST";
    document.getElementById("submitReturn").style = "color: grey";
    document.getElementById("submitReturn").innerHTML = `${bookEl} has been added!`;
};

function getBook() {
    // const addedBook = document.createElement("p")
    const totalLibrary = localStorage.getItem("bookStorage");
    // addedBook.append(totalLibrary);
    // console.log(addedBook);
    document.getElementById("userLibrary").innerHTML = `${totalLibrary}`;
    return totalLibrary;
};

// --------------------------- Remove from local storage ---------------------------

const removeEl = document.getElementById('delete');

// removeEl.addEventListener('click', removeBook());

// function removeBook(){
//     libraryArr.remove(bookInputEl);
// };

// --------------------------- Due date reminder ---------------------------

const lentBookExample = {
    BookTitle: "Candide",
    Author: "AuthorName",
    Genre: "GenreName",
    ReadUnread: "ReadOrNot",
    LoanStatus: "Loaned",
    DueDate: "Tomorrow",
    LoanedTo: "Crindy",
    RemoveEdit: "Delete me"
};

const lentBooks = ["Leviathan", "Candide", "War & Peace"];

const dueDateRowEl = document.querySelector("#resultsDue");

function dueDateReminder() {
    const dueDateEl = document.querySelector("#dueDates");
    lentBooks.push(dueDateEl);
    for (let i = 0; i < lentBooks.length; i++) {
        // const element = array[i];
        if (lentBooks.length <= 0) {
            dueDateEl.textContent = "No upcoming due dates!";
        } else {
            // array.forEach(item => console.log(item));
            // lentBooks.forEach(item => console.log(item));

            // lentBooks.forEach(function, dueDateRowEl);
            // dueDateEl.textContent = `${dueDateEl} is due on ${dueDateEl}`;
        };
    };
};

window.onload = function () {
    dueDateReminder();
};

// --------------------------------------------------------------------------------