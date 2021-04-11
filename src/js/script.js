{

  'use strict';
  
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookImage: '.book__image',
    },
  };
  
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const classNames = {
    bookClass: {
      bookFavorite: 'favorite',
    }
  };
  
  
  const render = function() {
    const thisBook = this;
    thisBook.data = dataSource.books;
    
    for(const book of thisBook.data) {
      // generate HTML of the book
      const generatedHTML = templates.book(book);    
      // generate DOM
      thisBook.element = utils.createDOMFromHTML(generatedHTML); 
      // find book list container
      const bookContainer = document.querySelector(select.containerOf.bookList);
  
      // add DOM to book list
      bookContainer.appendChild(thisBook.element); 
    }
  };

  const favoriteBooks = [];
  const initActions = function() {
    
    const bookImages = document.querySelectorAll(select.containerOf.bookImage);

    for (let bookImage of bookImages) {
      bookImage.addEventListener('dblclick', function(event) {
        event.preventDefault();
        bookImage.classList.add(classNames.bookClass.bookFavorite);
        let id = bookImage.getAttribute('data-id');
        console.log(id);
        favoriteBooks.push(id);

      });
    }
    console.log(favoriteBooks);

   
  };
  

  render();
  initActions();
}

