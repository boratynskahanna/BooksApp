{
  'use strict';
  
  
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
  };
  
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  const render = function() {
    
  
    for(let book in dataSource.books) {
      // generate HTML of the book
      const generatedHTML = templates.book(book);    
      // generate DOM
      const domElement = utils.createDOMFromHTML(generatedHTML); 
      // find book list container
      const bookContainer = document.querySelector(select.containerOf.bookList);
  
      // add DOM to book list
      bookContainer.appendChild(domElement); 
    }
  };
  
  render();
  
}

