let myLibrary = [];
let username;

/* FIREBASE - START */

var firebaseConfig = {
    apiKey: "AIzaSyDkFWJ4F1AgXdb1nuVaUt5T2Ihk87bM4mA",
    authDomain: "top-library-b04a4.firebaseapp.com",
    projectId: "top-library-b04a4",
    storageBucket: "top-library-b04a4.appspot.com",
    messagingSenderId: "937710027242",
    appId: "1:937710027242:web:8d89f93072c64c4a8db293",
    measurementId: "G-0S8S879QNM"
};
// Initialize Firebase
var defaultApp = firebase.initializeApp(firebaseConfig);

function writeUserData() { //Writes data to firebase
    if (userID) {
        firebase.database().ref('users/' + userID).set(myLibrary);
    }
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        username = user.displayName;
        Object.defineProperty(window, 'userID', { //Make global constant userID
            value: firebase.auth().currentUser.uid,
            configurable: false,
            writable: false
        });
        initialize();
    } else {
        console.log("not logged");
    }
});


function initialize() { //Reads myLibrary array from firebase
    firebase.database().ref('users/' + userID).once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            myLibrary.push(child.val());
        });
        logout();
        updateDisplay();
    });
}

/* FIREBASE - END */

var popupForm = document.querySelector('.popup-form');
var closePopupBtn = document.querySelector('.close');

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

function initAddNewBook() {
    popupForm.style.display = "block";

}

closePopupBtn.onclick = function() {
    popupForm.style.display = "none";
}

function addBook() {
    var title = document.getElementById("id-input-book").value;
    var author = document.getElementById("id-input-author").value;
    var read = document.getElementById("id-read").checked;

    const book = new Book(title, author, read);

    myLibrary.push(book);

    writeUserData();
    updateDisplay();
    popupForm.style.display = "none";
}

function logout() {
    let logoutBtn = document.createElement("button");
    let headerContainer = document.querySelector('.header-title');
    logoutBtn.id = "logoutBtn";
    logoutBtn.textContent = "Logout";
    logoutBtn.addEventListener("click", () => {
        firebase.auth().signOut();
        location.href = "login.html";
    });
    logoutBtn.classList.add('logoutBtn');
    let displayUserName = document.createElement("p");
    displayUserName.textContent = username;
    displayUserName.classList.add('username');
    headerContainer.appendChild(displayUserName);
    headerContainer.appendChild(logoutBtn);
}

function updateDisplay() {

    if (myLibrary.length > 0) {
        let emptyLib = document.getElementById("empty-library");
        emptyLib.style.visibility = "hidden";
    }

    const dispBooks = document.getElementById("display-books");
    dispBooks.textContent = "";

    myLibrary.forEach(function(book) {

        let container = document.createElement("div");

        let title = document.createElement("h2");
        let author = document.createElement("h3");

        let read = document.createElement("input");
        read.checked = book.read;
        read.type = "checkbox";
        read.name = "read-checkbox";
        read.addEventListener('change', (event) => {
            if (event.currentTarget.checked) {
                book.read = true;
                writeUserData();
            } else {
                book.read = false;
                writeUserData();
            }
        })

        let label = document.createElement("label");
        label.htmlFor = "read-checkbox";
        label.appendChild(document.createTextNode("Read? "));

        let rmvBook = document.createElement("button");

        title.textContent = book.title;
        author.textContent = book.author;
        rmvBook.textContent = "Remove";
        rmvBook.style.margin = "15px";
        rmvBook.onclick = function(book) {
            myLibrary.splice(book, 1);
            updateDisplay();
            writeUserData();
        }


        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(label);
        container.appendChild(read);
        container.appendChild(rmvBook);

        container.classList.add('book');

        dispBooks.appendChild(container);

    })
}