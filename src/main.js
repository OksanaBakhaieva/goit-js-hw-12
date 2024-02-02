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
  page: 1,
  maxPage: 0,
  per_page: 15,
};

refs.form.addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  queryParams.page = 1;

  const form = event.currentTarget;
  queryParams.query = form.elements.query.value.trim();
  showLoader();
 
  if (!queryParams.query) {
    createMessage("The search field can't be empty! Please, enter your request!");
    return;
    hideLoader();
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
      backgroundColor: '#EF4040',
      close: false,
      closeOnClick: true,
    });
  }

  try {
    const { hits, totalHits } = await getImages(queryParams);
    queryParams.maxPage = Math.ceil(totalHits / queryParams.per_page);
    
    refs.gallery.insertAdjacentHTML("beforeend", createMarkup(hits));
    simplyGallery.refresh();
    hideLoader();

    if (hits.length === 0) {
      createMessage(`Sorry, there are no images matching your search query. Please, try again!`);
      hideLoader();
      
      } else if (hits.length > 0 && hits.length !== totalHits) {
      showButton();
      refs.button.addEventListener("click", handleLoadMore);
      hideLoader();
      
    } else {
      hideButton();
      createMessage("We are sorry, but you've reached the end of search results");
    }

  } catch (error) {
    createMessage("Sorry, there is a problem with connection with the server");
      
  } finally {
    hideLoader();
    form.reset();
    scrollBy();
  }
  
function hideLoader() {
      setTimeout(() => {
        refs.loader.classList.add('is-hidden');
      }, 500);
    };

function showLoader() {
      refs.loader.classList.remove('is-hidden');
    };
  
function hideButton() {
      refs.button.classList.add('is-hidden');
    }

function showButton() {
      refs.button.classList.remove('is-hidden');
    }

}

  async function handleLoadMore() {
    queryParams.page += 1;
    showLoader();
    refs.button.disabled = true;
        
    try {
      const { hits } = await getImages(queryParams);
      refs.gallery.insertAdjacentHTML("beforeend", createMarkup(hits));
      simplyGallery.refresh();

    } catch (error) {
      createMessage("Sorry, there is a problem with connection with the server");
    
    } finally {
      hideLoader();
      refs.button.disabled = false;
           
      if (queryParams.page === queryParams.maxPage) {
        hideLoader();
        hideButton();
        refs.button.removeEventListener("click", handleLoadMore);
        createMessage("We are sorry, but you've reached the end of search results");
      }
      scrollBy();
    }
    function hideLoader() {
      setTimeout(() => {
        refs.loader.classList.add('is-hidden');
      }, 500);
    };

function showLoader() {
      refs.loader.classList.remove('is-hidden');
    };
  
function hideButton() {
      refs.button.classList.add('is-hidden');
    }

function showButton() {
      refs.button.classList.remove('is-hidden');
    }
}
  

 
  
  

