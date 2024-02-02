import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/refs';
import { getImages } from './js/pixayApi';
import { createMarkup } from './js/render-function';
import { scrollBy } from './js/scrollBy';
import buttonService from './js/buttonService';

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
  queryParams.query = refs.input.value.trim();
  
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
    const {hits, totalHits } = await getImages(queryParams);
    queryParams.maxPage = Math.ceil(totalHits / queryParams.per_page);
    createMarkup(hits, refs.gallery);  
    // refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    gallery.refresh();

    if (hits.length > 0 && hits.length !== totalHits) {
      buttonService.show(refs.btnMore); // показуємо кнопку, якщо є результати від серверу і якщо ми не показали всі резульати які є (наприклад, якщо тотал резалст = 100 і кількість артіклів = 100)
      refs.btnMore.addEventListener("click", handleLoadMore);
      hideLoader();
      
    } else {
      buttonService.hide(refs.btnMore);
      createMessage("We are sorry, but you've reached the end of search results");
    }

  } catch (error) {
    // createMessage("Sorry, there is a problem with connection with the server");
    console.log(error)
  
  } finally {
    hideLoader();
    refs.form.reset();
    scrollBy();
  }

  // обробка натискання на кнопку завантажити більше
  async function handleLoadMore() {
    queryParams.page += 1;
    showLoader();
   
    // перед початком запиту - показуємо лоадер і блокуємо кнопку
  buttonService.disable(refs.btnMore);
    try {
      const { hits } = await getImages(queryParams);
      createMarkup(hits, refs.gallery);//малюємо розмітку
      
      // refs.gallery.refresh();

      // if (data.hits.length > 0) {
      //   showButton();
      //   refs.btnMore.addEventListener('click', handleLoadMore);
      // } else {
      //   hideButton();
      //   createMessage("We're sorry, but you've reached the end of search results");
      // }

    } catch (error) {
      console.log(error);
      // createMessage("Sorry, there is a problem with connection with the server");
    
    } finally {
      hideLoader();     // після запиту - ховаємо лоадер і розблоковуємо кнопку
    buttonService.enable(refs.btnMore);
     
      // і обовʼязково після натискання на кнопку та закінчення запиту перевіряємо, якщо ми зараз знаходимось на останній сторінці - то ховаємо кнопку і видаляємо обробник подій!
    if (queryParams.page === queryParams.maxPage) {
      buttonService.hide(refs.btnMore);
      refs.btnMore.removeEventListener("click", handleLoadMore);
      createMessage("We are sorry, but you've reached the end of search results");
    }
             
      scrollBy();
    }
  }

  function hideLoader() {
    setTimeout(() => {
        refs.loader.classList.add('is-hidden');
        }, 500);
  };

  function showLoader() {
        refs.loader.classList.remove('is-hidden');
  };
  
  
}
