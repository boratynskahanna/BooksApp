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
    
    const bookList = document.querySelector(select.containerOf.bookList);

    bookList.addEventListener('dblclick', function(event) {
      event.preventDefault();
        
      if (event.target.offsetParent.classList.contains(select.containerOf.bookImage)) {

        
        if(!event.target.offsetParent.classList.contains(classNames.bookClass.bookFavorite)) {
          event.target.offsetParent.classList.add(classNames.bookClass.bookFavorite);
          let id = event.target.offsetParent.getAttribute('data-id');
          favoriteBooks.push(id);

        } else {
          event.target.offsetParent.classList.remove(classNames.bookClass.bookFavorite);
          let id = event.target.offsetParent.getAttribute('data-id');
          favoriteBooks.splice(favoriteBooks.indexOf(id), 1);
        }
      }  
      console.log(favoriteBooks);
  
    });
  
  };
  render();
  initActions();


}