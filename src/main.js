import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { getImages } from './js/pixayApi';
import { createMarkup } from './js/render-function';
import { scrollBy } from './js/scrollBy';


const simplyGallery = new SimpleLightbox('.gallery-item a', {
        captionsData: 'alt',
        captionDelay: 250,
});

const queryParams = {
  query: '',
  page: 0,
  maxPage: 0,
  per_page: 15,
};

refs.form.addEventListener('submit', handleSearch);
refs.button.addEventListener("click", handleLoadMore);

queryParams.maxPage = Math.ceil(queryParams.totalHits / queryParams.per_page);

async function handleSearch(event) {
  event.preventDefault();
  
  queryParams.query = event.currentTarget.elements.query.value.trim();
  queryParams.page = 1;
  
  showLoader();  
  hideButton();

  refs.gallery.innerHTML = '';
     
  if (!queryParams.query) {
    createMessage("The search field can't be empty! Please, enter your request!");
    hideLoader();
    return;
  }

  try {
    const res = await getImages(queryParams.query, queryParams.page);
    if (res.hits.length === 0) {
      createMessage('Sorry, there are no images matching your search query. Please try again!');
      refs.form.reset();
      hideLoader();
      return;
    }
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(res.hits));
    simplyGallery.refresh();
            
    if (res.hits.length >= 15) {
      hideLoader();  
      showButton();
    } else {
      hideButton();
      createMessage("We're sorry, but you've reached the end of search results");
    }
    
    refs.form.reset();
      
  } catch (error) {
    hideButton();
    refs.gallery.innerHTML = '';
    createMessage("Sorry, there is a problem with connection with the server");
    
  } finally {
    hideLoader();
    refs.form.reset();
    if (queryParams.page === queryParams.maxPage) {
      createMessage("We're sorry, but you've reached the end of search results!");
    }
  }
}

async function handleLoadMore() {
    queryParams.page += 1;
    showButton();
    refs.button.disabled = true;
        
    try {
      const res = await getImages(queryParams.query, queryParams.page);
      refs.button.disabled = false;

      if ((res.totalHits - (queryParams.page * queryParams.per_page)) < 0) {
        refs.gallery.insertAdjacentHTML("beforeend", createMarkup(res.hits));
        hideButton();
        createMessage("We're sorry, but you've reached the end of search results");
        scrollBy();

      } else if (res.hits.length > 0) {
        refs.gallery.insertAdjacentHTML("beforeend", createMarkup(res.hits));
        simplyGallery.refresh();
    refs.form.reset();
        scrollBy();
        return;
      } 
      
    
      
    } catch (error) {
      createMessage("Sorry, there is a problem with connection with the server");
    }       
}
      
function createMessage(message) {
    iziToast.show({
      class: 'error-svg',
      position: 'topRight',
      icon: 'error-svg',
      message: message,
      maxWidth: '432',
      messageColor: '#fff',
      messageSize: '16px',
      backgroundColor: '#4e75ff',
      close: false,
      closeOnClick: true,
      fontfamily: 'Montserrat', 
      fontsize: '16px',
    });
}
  
function hideLoader() {
      setTimeout(() => {
        refs.loader.style.display = 'none';
      }, 1000);
    };

  function showLoader() {
      refs.loader.style.display = 'block';
    };
  
  function hideButton() {
      refs.button.style.display = 'none';
    }

  function showButton() {
      refs.button.style.display = 'block';;
    }  

 
  
  

