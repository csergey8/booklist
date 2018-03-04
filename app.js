// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Instert cols 
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

//Clear fields
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function(msg, className) {
    // Create div 
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(msg));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert to DOM
    container.insertBefore(div, form);

    // Hide message
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 2000);
}

// Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get Form Values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book  to list 
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Success', 'success');

        // Clear fields
        ui.clearFields();
    }

    e.preventDefault();
   
});


// Event listener for delete

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();


    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book removed', 'success');

    e.preventDefault();
});
