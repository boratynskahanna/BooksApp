{

  'use strict';
  
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
    },
  };
  
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const classNames = {
    bookClass: {
      bookFavorite: 'favorite',
      checkedClass: 'checked',
      hiddenClass: 'hidden',
      bookImage: 'book__image',
    }
  };
  

  class BooksList {
    constructor() {
      const thisBookList = this;

      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.initActions();
    }

    initData() {
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }

    getElements () {
      const thisBookList = this;

      thisBookList.bookList = document.querySelector(select.containerOf.bookList);
      thisBookList.filterContainer = document.querySelector(select.containerOf.filters);
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      //const favoriteBooks = [];
      //const filters = [];
      //const filterContainer = document.querySelector(select.containerOf.filters);
      //const bookList = document.querySelector(select.containerOf.bookList);
    }

    render() {
      const thisBookList = this;
        
      for(const book of thisBookList.data) {
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        // generate HTML of the book
        const generatedHTML = templates.book(book);    
        // generate DOM
        thisBookList.element = utils.createDOMFromHTML(generatedHTML); 
        // add DOM to book list
        thisBookList.bookList.appendChild(thisBookList.element); 
      }

    }

    initActions() {
      const thisBookList = this;
      thisBookList.bookList.addEventListener('dblclick', function(event) {
        event.preventDefault();
              
        if (event.target.offsetParent.classList.contains(classNames.bookClass.bookImage)) {
          const id = event.target.offsetParent.getAttribute('data-id');
              
          if(!event.target.offsetParent.classList.contains(classNames.bookClass.bookFavorite)) {
            thisBookList.favoriteBooks.push(id);
            event.target.offsetParent.classList.add(classNames.bookClass.bookFavorite);
            console.log(event.target.offsetParent);
          } else {
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(id), 1);
            event.target.offsetParent.classList.remove(classNames.bookClass.bookFavorite);
                
          }
        }  
        
      });
      
      thisBookList.filterContainer.addEventListener('change', function(event) {
        event.preventDefault();
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
      
          if (event.target.checked) {
            event.target.classList.add(classNames.bookClass.checkedClass);
            thisBookList.filters.push(event.target.value);
          } else {
            event.target.classList.remove(classNames.bookClass.checkedClass);
            thisBookList.filters.splice(thisBookList.filters.indexOf(event.target.value), 1);
          }
        }
        thisBookList.filterBooks();
      });
      
    }

    filterBooks () {
      const thisBookList = this;
      
      for (let book of thisBookList.data) {
        const bookImage = document.querySelector(`${select.containerOf.bookImage}[data-id="${book.id}"]`);
        let shouldBeHidden = false;
        for (const filter of thisBookList.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          } 
        }
        if (shouldBeHidden) {
          bookImage.classList.add(classNames.bookClass.hiddenClass);
        } else {
          bookImage.classList.remove(classNames.bookClass.hiddenClass);
        }
      }
    }

    determineRatingBgc(rating) {
      let bgc = '';
      if (rating<6) {
        bgc =  'linear-gradient(to bottom,  #fefcea 0%,#f1da36 100%)';
      }
      if (rating>6 && rating<=8){
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      if(rating>8 && rating<=9){
        bgc = 'linear-gradient(to bottom, #299a0b 0%,#299a0b 100%)';
      }
      if(rating>9){
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return bgc;
    }
  }
  



  const app = {
    init: function() {
      new BooksList();
    }
  };
  app.init();

}